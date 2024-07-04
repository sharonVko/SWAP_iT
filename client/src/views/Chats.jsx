import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UseContextStore } from '../context/ChatContext';
import { useAuth } from '../context/AuthProvider';

const Chats = () =>
{
  const { user, chatData, setChatData, loading } = UseContextStore();
  const [newChatUserName, setNewChatUserName] = useState('');
  const { isLoggedIn, userData } = useAuth();


  useEffect(() =>
  {
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

    fetchChats();
  }, [setChatData]);


  const handleNewChat = async (e) =>
  {
    e.preventDefault();

    if (!isLoggedIn)
    {
      console.error('User is not logged in! Please log in');
      return;
    }

    if (!newChatUserName)
    {
      console.error('Please enter a username to start a chat');
      return;
    }

    try
    {
      // Fetch user data by username
      const userToChat = await axios.get(`http://localhost:8000/users/${newChatUserName}`)
      if (!userToChat || !userToChat._id)
      {
        console.error(`User with username "${newChatUserName}" not found`);
        return;
      }

      const response = await axios.post(
        'http://localhost:8000/chats',
        {
          participants: [userData._id, newChatUser._id],
        },
        {
          withCredentials: true,
        }
      );
      setChatData(prevChatData => [...prevChatData, response.data]);
      setNewChatUserName('');  // Reset input field or clear selected user
    } catch (error)
    {
      console.error('Error starting new chat:', error);
    }
  };

  if (!isLoggedIn)
  {
    return <div>Please Login!...</div>;
  }

  return (
    <div>
      <h2>Chats</h2>
      <ul>
        {chatData &&
          chatData.map((chat) => (
            <li key={chat._id}>
              {chat.participants.map((participant) => participant.username).join(', ')}
            </li>
          ))}
      </ul>
      <div>
        <input
          type="text"
          value={newChatUserName}
          onChange={(e) => setNewChatUserName(e.target.value)}
          required
          placeholder="Enter user name"
        />
        <button onClick={handleNewChat} className='bg-blue-500 m-4'>Start New Chat</button>
      </div>
    </div>
  );
};

export default Chats;
