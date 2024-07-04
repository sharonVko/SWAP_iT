import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useSocket } from '../context/SocketContext';

const ChatRoom = ({ roomId }) => {
  const { socket } = useSocket();
  const { userData } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (socket == null) return;

    socket.emit('joinRoom', roomId);

    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.emit('leaveRoom', roomId);
      socket.off('newMessage');
    };
  }, [socket, roomId]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (newMessage.trim() && userData) {
      const message = {
        text: newMessage,
        sender: userData.username,
        roomId: roomId,
        timestamp: new Date(),
      };

      socket.emit('sendMessage', message);
      setNewMessage('');
    }
  };

  return (
    <div>
      <h2>Room: {roomId}</h2>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <span>
              {message.sender}: {message.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          required
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;
