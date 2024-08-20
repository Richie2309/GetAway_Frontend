import React, { useEffect, useState, useRef } from 'react';
import { MdSend, MdImage, MdMic } from 'react-icons/md';
import { getMessages, sendMessage } from '../../api/user';
import Loading from './Loading';
import { useSocketContext } from '../../context/SocketContext';

export const ChatScreen = ({ hostId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const { socket } = useSocketContext()

  useEffect(() => {
    console.log('socket', socket);

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
      console.log('newmess', message);

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

  const handleSendMessage = async () => {
    setNewMessage('');
    if (newMessage.trim() === '') return;

    const message = {
      senderId: socket.id, // This might be changed to the actual user ID if available
      receiverId: hostId,
      message: newMessage,
      createdAt: new Date(),
    };

    try {
      // Emit the message event to the backend via Socket.IO
      socket?.emit('sendMessage', message);

      // Save the message to the database using the API call
      await sendMessage(hostId, newMessage);

      setMessages((prevMessages) => [...prevMessages, message]);
    } catch (error) {
      console.error("Error sending message", error);
      // Optionally, you can show an error message to the user
    }
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
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.senderId === hostId ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-md p-3 rounded-lg ${msg.senderId === hostId ? 'bg-accent text-accent-foreground' : 'bg-secondary text-secondary-foreground'} shadow-md`}>
              <p className="text-md">{msg.message}</p>
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
      <div className="flex items-center p-4 bg-card text-card-foreground rounded-b-lg shadow-lg">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border border-input rounded-lg focus:outline-none focus:ring focus:ring-primary transition duration-200"
          placeholder="Type a message..."
        />
        {/* <button className="ml-2 p-2 text-primary hover:text-primary/80 transition duration-200" title="Send Image">
          <MdImage size={24} />
        </button>
        <button className="ml-2 p-2 text-primary hover:text-primary/80 transition duration-200" title="Send Audio">
          <MdMic size={24} />
        </button> */}
        <button
          onClick={handleSendMessage}
          disabled={newMessage.trim() === ''} // Disable button if input is empty
          className="ml-2 p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition duration-200 flex items-center justify-center"
          title="Send Message"
        >
          <MdSend size={20} />
        </button>
      </div>
    </div>
  );
};
