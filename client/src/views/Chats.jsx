import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UseContextStore } from '../context/ChatContext';

const Chats = () =>
{
  const { user, chatData, setChatData } = UseContextStore();
  const [newChatUser, setNewChatUser] = useState('');

  useEffect(() =>
  {
    const fetchChats = async () =>
    {
      try
      {
        const response = await axios.get('/chats');
        setChatData(response.data);
      } catch (error)
      {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, [setChatData]);

  // const handleNewChat = async () =>
  // {
  //   if (!user || !user._id)
  //   {
  //     console.error('User is not defined');
  //     return;
  //   }

  //   try
  //   {
  //     const response = await axios.post('/chats', {
  //       participants: [user._id, newChatUser],
  //     });
  //     setChatData([...chatData, response.data]);
  //     setNewChatUser('');
  //   } catch (error)
  //   {
  //     console.error('Error starting new chat:', error);
  //   }
  // };

  return (
    <div>
      <h2>Chats</h2>
      <ul>
        {chatData && chatData.map(chat => (
          <li key={chat._id}>
            {chat.participants.map(participant => participant.name).join(', ')}
          </li>
        ))}
      </ul>
      {/* <div>
        <input
          type="text"
          value={newChatUser}
          onChange={(e) => setNewChatUser(e.target.value)}
          placeholder="Enter user ID to start chat"
        />
        <button onClick={handleNewChat}>Start New Chat</button>
      </div> */}
    </div>
  );
};

export default Chats;
