import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';

import { useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';

const ChatRooms = () => {
  const { socket, onlineUsers } = useSocket() || {};
  const { userData } = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const navigate = useNavigate();

  const handleJoinRoom = (roomId) => {
    navigate(`/chatrooms/${roomId}`);
  };

  if (!userData) {
    return <div>Please Login...</div>;
  }

  if (!socket) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Online Users</h1>
      <ul>
        {onlineUsers &&
          onlineUsers.map((user) => (
            <li key={user.id} className='flex items-center'>
              <span className='mr-2 inline-block w-2 h-2 bg-green-500 rounded-full'></span>
              {user.username}
            </li>
          ))}
      </ul>

      <h1>Chat Rooms</h1>
      <input
        type='text'
        value={newRoom}
        onChange={(e) => setNewRoom(e.target.value)}
        placeholder='Enter room name'
      />
      <button onClick={() => handleJoinRoom(newRoom)}>Join Room</button>
    </div>
  );
};

export default ChatRooms;
