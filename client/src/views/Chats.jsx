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

    // Check authentication and input validation
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
      const userToChat = await axios.get(`http://localhost:8000/users/${newChatUserName}`);
      if (!userToChat || !userToChat.data._id)
      {
        console.error(`User with username "${newChatUserName}" not found`);
        return;
      }

      // Create new chat
      const response = await axios.post(
        'http://localhost:8000/chats',
        {
          participants: [userData._id, userToChat.data._id],
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

  const handleDeleteChat = async (id) =>
  {
    try
    {
      await axios.delete(`http://localhost:8000/chats/${id}`, {
        withCredentials: true,
      });
      setChatData(prevChatData => prevChatData.filter(chat => chat._id !== id));
    } catch (error)
    {
      console.error(`Error deleting chat ${id}:`, error);
    }
  };

  const handleDeleteSelectedChats = async () =>
  {
    const idsToDelete = chatData.filter(chat => chat.selectedForDeletion).map(chat => chat._id);
    try
    {
      await axios.post('http://localhost:8000/chats/delete', { ids: idsToDelete }, {
        withCredentials: true,
      });
      setChatData(prevChatData =>
        prevChatData.filter(chat => !idsToDelete.includes(chat._id))
      );
    } catch (error)
    {
      console.error('Error deleting selected chats:', error);
    }
  };

  const handleToggleSelect = (id) =>
  {
    setChatData(prevChatData =>
      prevChatData.map(chat =>
        chat._id === id ? { ...chat, selectedForDeletion: !chat.selectedForDeletion } : chat
      )
    );
  };

  if (!isLoggedIn)
  {
    return <div>Please Login!...</div>;
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={newChatUserName}
          onChange={(e) => setNewChatUserName(e.target.value)}
          required
          placeholder="Enter user name"
        />
        <button onClick={handleNewChat} className='bg-blue-500 m-4 p-2'>Start New Chat</button>
        <button onClick={handleDeleteSelectedChats}>Delete Selected Chats</button>
      </div>

      <div>
        <h2>Chats</h2>
        <ul>
          {chatData &&
            chatData.map((chat) => (
              <li key={chat._id}>

                {chat.participants
                  .filter((participant) => participant._id !== userData._id)
                  .map(participant => participant.username).join(', ')}
                <button onClick={() => handleDeleteChat(chat._id)} className='m-4 bg-blue-500 p-2'>Delete</button>
                <input
                  type="checkbox"
                  checked={chat.selectedForDeletion || false}
                  onChange={() => handleToggleSelect(chat._id)}
                />
              </li>
            ))}
        </ul>
      </div>

    </div>
  );
};

export default Chats;
