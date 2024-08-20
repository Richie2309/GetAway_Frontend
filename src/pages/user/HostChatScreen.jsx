import React, { useEffect, useState, useRef } from 'react';
import { getMessagedUsers, getMessages, sendMessage } from '../../api/user';
import { useSocketContext } from '../../context/SocketContext';

const HostChatScreen = () => {
  const [messagedUsers, setMessagedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const { socket } = useSocketContext()

  useEffect(() => {
    const fetchMessagedUsers = async () => {
      try {
        setLoading(true);
        const response = await getMessagedUsers();
        console.log('res', response);

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
    if (!newMessage.trim()) return;

    const message = {
      senderId: socket.id, // This might be changed to the actual user ID if available
      receiverId: selectedUser.userId,
      message: newMessage,
      createdAt: new Date(),
    };

    try {
      // Emit the message event to the backend via Socket.IO
      socket?.emit('send_message', message);

      // Save the message to the database using the API call
      await sendMessage(selectedUser.userId, newMessage);

      // Optimistically update the UI
      setMessages((prevMessages) => [...prevMessages, message]);
    } catch (error) {
      console.error("Error sending message", error);
      // Optionally, you can show an error message to the user
    }
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
                <div key={index} className={`mb-2 ${msg.senderId === selectedUser.userId ? 'text-left' : 'text-right'}`}>
                  <div className={`inline-block p-2 rounded-lg ${msg.senderId === selectedUser.userId ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}>
                    <p>{msg.message}</p>
                    <span className="text-xs text-gray-500">
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
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 border rounded-l-lg p-2"
                  placeholder="Type a message..."
                />
                <button type="submit" className="bg-blue-500 text-white rounded-r-lg px-4">Send</button>
              </div>
            </form>
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