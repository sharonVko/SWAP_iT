import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UseContextStore } from '../context/ChatContext';

const Chats = () =>
{
  const { user, chatData, setChatData, loading } = UseContextStore();
  const [newChatUser, setNewChatUser] = useState('');

  useEffect(() =>
  {
    if (!loading && chatData.length === 0)
    {
      fetchChats(); // Fetch chats only once user and chatData are available and chatData is empty
    }
  }, [user, chatData, loading]);

  const fetchChats = async () =>
  {
    try
    {
      const response = await axios.get('http://localhost:8000/chats/', {
        withCredentials: true,
      });
      setChatData(response.data);
      console.log(response.data);
    } catch (error)
    {
      console.error('Error fetching chats:', error);
    }
  };

  // console.log(user);
  // console.log(user._id)
  const handleNewChat = async (e) =>
  {
    e.preventDefault();

    if (!user || !user._id)
    {
      console.error('User is not defined or does not have _id');
      return;
    }

    try
    {
      const response = await axios.post(
        'http://localhost:8000/chats',
        {
          participants: [user._id, newChatUser],
        },
        {
          withCredentials: true,
        }
      );
      setChatData([...chatData, response.data]);
      setNewChatUser('');
    } catch (error)
    {
      console.error('Error starting new chat:', error);
    }
  };

  if (loading)
  {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Chats</h2>
      <ul>
        {chatData &&
          chatData.map((chat) =>
          {
            const participantNames = chat.participants
              .map((participant) => participant.username)
              .join(', ');
            return (
              <li key={chat._id}>
                {participantNames}
              </li>
            );
          })}
      </ul>
      <div>
        <input
          type="text"
          value={newChatUser}
          onChange={(e) => setNewChatUser(e.target.value)}
          required
          placeholder="Enter user ID to start chat"
        />
        <button onClick={handleNewChat} className='bg-blue-500 m-4'>Start New Chat</button>
      </div>
    </div>
  );
};

export default Chats;
