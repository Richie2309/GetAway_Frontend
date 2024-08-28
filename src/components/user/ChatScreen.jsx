import React, { useEffect, useState, useRef } from 'react';
import { MdSend, MdMic, MdAttachFile, MdEmojiEmotions } from 'react-icons/md';
import { getMessages, sendMessage } from '../../api/user';
import Loading from './Loading';
import { useSocketContext } from '../../context/SocketContext';
import EmojiPicker from 'emoji-picker-react';

export const ChatScreen = ({ hostId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const audioRef = useRef(null);

  const { socket } = useSocketContext()

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getMessages(hostId);
        setMessages(response);
      } catch (error) {
        console.error("Error fetching messages", error);
        setError("Failed to load messages.");
      } finally {
        setLoading(false);
      }
    };
    if (hostId) {
      fetchMessages();
    }
    // Listen for incoming messages
    socket?.on('newMessage', (message) => {
      if (message.senderId === hostId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket?.off('newMessage');
    };
  }, [hostId, socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setNewMessage('');
    if (newMessage.trim() === '') return;

    let message;
    if (file) {
      const base64 = await convertToBase64(file);
      message = {
        senderId: socket.id,
        receiverId: hostId,
        message: base64,
        type: file.type.split('/')[0],
        createdAt: new Date(),
      };
    } else if (audioBlob) {
      const base64 = await convertToBase64(audioBlob);
      message = {
        senderId: socket.id,
        receiverId: hostId,
        message: base64,
        type: 'audio',
        createdAt: new Date(),
      };
    } else {
      message = {
        senderId: socket.id,
        receiverId: hostId,
        message: newMessage,
        type: 'text',
        createdAt: new Date(),
      };
    }
    try {
      await sendMessage(hostId, message.message, message.type);
      socket?.emit('sendMessage', message);
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col h-full bg-background text-foreground font-poppins">
      <div className="flex items-center p-4 bg-primary text-primary-foreground shadow-lg rounded-t-lg">
        <h2 className="text-xl font-semibold">Chat with Host</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-zinc-100 to-zinc-300">
        {error && <div className="text-red-500">{error}</div>}
        {messages.map((msg, index) => {
          return (
            <div key={index} className={`flex ${msg.senderId === hostId ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-md p-3 rounded-lg ${msg.senderId === hostId ? 'bg-accent text-accent-foreground' : 'bg-secondary text-secondary-foreground'} shadow-md`}>
                {msg.type === 'text' && <p className="text-md">{msg.message}</p>}
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
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center p-4 bg-card text-card-foreground rounded-b-lg shadow-lg">
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="ml-2 p-2 text-primary hover:text-primary/80 transition duration-200"
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
          className="flex-1 p-2 border border-input rounded-lg focus:outline-none focus:ring focus:ring-primary transition duration-200"
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
        <button
          onClick={handleSendMessage}
          disabled={newMessage.trim() === '' && !file && !audioBlob}
          className="ml-2 p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition duration-200 flex items-center justify-center"
          title="Send Message"
        >
          <MdSend size={20} />
        </button>
      </div>

    </div>
  );
};
