import { useEffect, useState } from 'react';
import axios from 'axios';
import LoginForm from '../components/LoginForm.jsx';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ChatRoom from './ChatRoom.jsx';

const Chats = () => {
  const { isLoggedIn, userData } = useAuth();
  const [chatData, setChatData] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null); // Track selected chat
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('http://localhost:8000/chats/', {
          withCredentials: true,
        });
        setChatData(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
    if (isLoggedIn) {
      fetchChats();
    }
  }, [isLoggedIn]);

  const handleDeleteChat = async (chatId) => {
    console.log(chatId);
    try {
      await axios.delete(`http://localhost:8000/chats/${chatId}`, {
        withCredentials: true,
      });
      alert('Chat was deleted');
      setChatData((prevChatData) =>
        prevChatData.filter((chat) => chat._id !== chatId)
      );
    } catch (error) {
      console.error(`Error deleting chat:`, error);
    }
  };

  const handleChatClick = (chat) => {
    setSelectedChat(chat); // Set selected chat
  };

  if (!isLoggedIn) {
    return <LoginForm target='/chats' />;
  }

  return (
    <div className='flex h-screen'>
      <div className='w-1/3 bg-gray-100 p-4 overflow-y-auto'>
        <h1 className='text-2xl font-bold mb-4'>Chats</h1>
        <ul>
          {chatData &&
            chatData.map((chat) => (
              <li
                key={chat._id}
                className='p-4 mb-2 bg-white rounded shadow cursor-pointer flex justify-between items-center'
                onClick={() => handleChatClick(chat)}
              >
                <div>
                  Product {chat.ad_id} -
                  {chat.participants
                    .filter((participant) => participant._id !== userData._id)
                    .map((participant) => participant.username)
                    .join(', ')}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteChat(chat._id);
                  }}
                  className='bg-red-500 text-white p-2 rounded'
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div className='w-2/3'>
        {selectedChat ? (
          <ChatRoom chat={selectedChat} userData={userData} />
        ) : (
          <div className='flex items-center justify-center h-full'>
            <p className='text-gray-500'>Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;
