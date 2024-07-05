import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UseContextStore } from '../context/ChatContext';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import SingleChat from './SingleChat'; // Adjust the import path

const Chats = () =>
{
  const { user, loading } = UseContextStore();
  const [chatData, setChatData] = useState([]);
  const [newChatUserName, setNewChatUserName] = useState('');
  const { isLoggedIn, userData } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

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
        console.log("chats:", response.data)
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
      const userToChat = await axios.get(`http://localhost:8000/users/${newChatUserName}`);
      if (!userToChat || !userToChat.data._id)
      {
        console.error(`User with username "${newChatUserName}" not found`);
        return;
      }

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
      setNewChatUserName('');
    } catch (error)
    {
      console.error('Error starting new chat:', error);
    }
  };

  const handleDeleteChat = async (chatId) =>
  {
    try
    {
      await axios.delete(`http://localhost:8000/chats/${chatId}`, {
        withCredentials: true,
      });
      setChatData(prevChatData => prevChatData.filter(chat => chat._id !== chatId));
    } catch (error)
    {
      console.error(`Error deleting chat :`, error);
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

  const handleChatClick = (id) =>
  {
    navigate(`/singlechat/${id}`);
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
                <span onClick={() => handleChatClick(chat._id)} style={{ cursor: 'pointer' }}>
                  {chat.participants
                    .filter((participant) => participant._id !== userData._id)
                    .map(participant => participant.username).join(', ')}
                </span>
                <button onClick={() => handleDeleteChat(chat._id)} className='m-4 bg-blue-500 p-2'>Delete</button>
                {/* <input
                  type="checkbox"
                  checked={chat.selectedForDeletion || false}
                  onChange={() => handleToggleSelect(chat._id)}
                /> */}
              </li>
            ))}
        </ul>
      </div>

    </div>
  );
};

export default Chats;
