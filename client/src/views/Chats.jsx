import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UseContextStore } from '../context/ChatContext';
import { useAuth } from '../context/AuthProvider';
import { useSocket } from '../context/SocketContext';

const Chats = () => {
  const { user, chatData, setChatData } = UseContextStore();
  const [newChatMessage, setNewChatMessage] = useState('');
  const { isLoggedIn, userData } = useAuth();
  const socket = useSocket();

  useEffect(() => {
    if (socket == null) return;

    socket.on('chat message', (message) => {
      setChatData((prevChatData) => [...prevChatData, message]);
    });

    return () => socket.off('chat message');
  }, [socket, setChatData]);

  const handleNewMessage = (e) => {
    e.preventDefault();

    if (newChatMessage.trim() && isLoggedIn) {
      const message = {
        text: newChatMessage,
        sender: userData.username,
        timestamp: new Date(),
      };

      socket.emit('chat message', message);
      setNewChatMessage('');
    }
  };

  if (!isLoggedIn) {
    return <div>Please Login!...</div>;
  }

  return (
    <div>
      <div>
        <input
          type='text'
          value={newChatMessage}
          onChange={(e) => setNewChatMessage(e.target.value)}
          required
          placeholder='Type a message'
        />
        <button onClick={handleNewMessage} className='bg-blue-500 m-4 p-2'>
          Send
        </button>
      </div>

      <div>
        <h2>Chats</h2>
        <ul>
          {chatData &&
            chatData.map((chat, index) => (
              <li key={index}>
                <span>
                  {chat.sender}: {chat.text}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Chats;
