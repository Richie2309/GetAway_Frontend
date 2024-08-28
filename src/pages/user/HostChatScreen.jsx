import React, { useEffect, useState, useRef } from 'react';
import { getMessagedUsers, getMessages, sendMessage } from '../../api/user';
import { useSocketContext } from '../../context/SocketContext';
import { MdSend, MdMic, MdAttachFile, MdEmojiEmotions } from 'react-icons/md';
import EmojiPicker from 'emoji-picker-react';

const HostChatScreen = () => {
  const [messagedUsers, setMessagedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const audioRef = useRef(null);
  const messagesEndRef = useRef(null);
  const { socket } = useSocketContext()

  useEffect(() => {
    const fetchMessagedUsers = async () => {
      try {
        setLoading(true);
        const response = await getMessagedUsers();
        setMessagedUsers(response);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching messaged users', err);
        setError('Failed to load users. Please try again.');
        setLoading(false);
      }
    };

    fetchMessagedUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
    }

    // Listen for incoming messages
    socket?.on('newMessage', (message) => {
      if (message.senderId === selectedUser.userId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket?.off('newMessage');
    };
  }, [selectedUser, socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const fetchedMessages = await getMessages(selectedUser.userId);
      setMessages(fetchedMessages);

      // Reset unread count for selected user
      setMessagedUsers(prevUsers =>
        prevUsers.map(user =>
          user.userId === selectedUser.userId ? { ...user, unreadMessagesCount: 0 } : user
        )
      );
    } catch (err) {
      console.error('Error fetching messages', err);
      setError('Failed to load messages. Please try again.');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setNewMessage('');
    if (!newMessage.trim() && !file) return;
    let message;
    if (file) {
      const base64 = await convertToBase64(file);
      message = {
        senderId: socket.id,
        receiverId: selectedUser.id,
        message: base64,
        type: file.type.split('/')[0], // 'image', 'video', 'audio', or 'application'
        createdAt: new Date(),
      };
    } else if (audioBlob) {
      const base64 = await convertToBase64(audioBlob);
      message = {
        senderId: socket.id,
        receiverId: selectedUser.id,
        message: base64,
        type: 'audio',
        createdAt: new Date(),
      };
    } else {
      message = {
        senderId: socket.id,
        receiverId: selectedUser.id,
        message: newMessage,
        type: 'text',
        createdAt: new Date(),
      };
    }

    try {
      await sendMessage(selectedUser.userId, message.message, message.type);
      socket?.emit('send_message', message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage('');
      setFile(null);
      setAudioBlob(null);
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);


  };

  const startRecording = () => {
    setIsRecording(true);
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        audioRef.current = mediaRecorder;
        mediaRecorder.start();

        const audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          setAudioBlob(audioBlob);
        });
      })
      .catch(err => {
        console.error('Error initializing media stream', err);
        setIsRecording(false);
      });
  };

  const stopRecording = () => {
    setIsRecording(false);
  
    if (audioRef.current && audioRef.current.state !== "inactive") {
      audioRef.current.stop();
    } else {
      console.error('MediaRecorder is not initialized.');
    }
  };
  
  

  const handleEmojiClick = (emojiObject) => {
    setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="font-poppins flex h-full">
      {/* User list on the left */}
      <div className="w-1/3 border-r overflow-y-auto">
        <h2 className="text-xl font-bold p-4 border-b">Chats</h2>
        {messagedUsers.length === 0 ? (
          <p className="p-4">No messages yet.</p>
        ) : (
          <ul>
            {messagedUsers.map((user) => (
              <li
                key={user.userId}
                className={`p-4 hover:bg-gray-100 cursor-pointer ${selectedUser?.userId === user.userId ? 'bg-gray-200' : ''}`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{user.fullName}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  {user.unreadMessagesCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {user.unreadMessagesCount}
                    </span>
                  )}
                </div>
              </li>

            ))}
          </ul>
        )}
      </div>

      {/* Chat area on the right */}
      <div className="w-2/3 flex flex-col h-full">
        {selectedUser ? (
          <>
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">Chat with {selectedUser.fullName}</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.senderId === selectedUser.userId ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-md p-3 rounded-lg ${msg.senderId === selectedUser.userId ? 'bg-accent text-accent-foreground' : 'bg-secondary text-secondary-foreground'} shadow-md`}>
                    {msg.type === 'text' && <p>{msg.message}</p>}
                    {msg.type === 'image' && <img src={msg.message} alt="Sent image" className="max-w-full h-auto" />}
                    {msg.type === 'video' && <video src={msg.message} controls className="max-w-full h-auto" />}
                    {msg.type === 'audio' && <audio src={msg.message} controls />}
                    {msg.type === 'file' && <a href={msg.message} target="_blank" rel="noopener noreferrer">Download File</a>}
                    <span className="text-xs text-muted-foreground">
                      {new Date(msg.createdAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t">
              <div className="flex items-center">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2 text-primary hover:text-primary/80 transition duration-200"
                  title="Send Emoji"
                >
                  <MdEmojiEmotions size={24} />
                </button>
                {showEmojiPicker && (
                  <div className="absolute bottom-16 left-4">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 border rounded-l-lg p-2"
                  placeholder="Type a message..."
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                  accept="image/*,video/*,audio/*,application/*"
                />
                <button onClick={() => fileInputRef.current.click()} className="ml-2 p-2 text-primary hover:text-primary/80 transition duration-200" title="Send File">
                  <MdAttachFile size={24} />
                </button>
                <button
                  onMouseDown={startRecording}
                  onMouseUp={stopRecording}
                  className={`p-2 text-primary hover:text-primary/80 transition duration-200 ${isRecording ? 'text-red-500' : ''}`}
                  title="Record Audio"
                >
                  <MdMic size={24} />
                </button>
                {audioBlob && (
                  <span className="text-sm text-green-500">Audio recorded</span>
                )}
                <button onClick={handleSendMessage}
                  className="bg-blue-500 text-white rounded-r-lg px-4 py-2">
                  <MdSend size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default HostChatScreen;