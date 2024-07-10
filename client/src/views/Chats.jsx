import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatRowContent from "../components/ChatRowContent.jsx";
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
    //setSelectedChat(chat); // Set selected chat
		navigate(`/singlechat/${chat._id}/${chat.ad_id}/${chat.participants[1]._id}`);
  };

  if (!isLoggedIn) {
    return <LoginForm target='/chats' />;
  }

  return (
	<>
	{!isLoggedIn ? (
		<LoginForm target="/" />
	) : (
		<>
			<h1 className="text-center mb-6">Meine Nachrichten</h1>
			<div className="rounded-lg p-4 md:p-8 max-w-[960px] mx-auto">
				<ul>
					{chatData && chatData.map((chat) => (

							<li
								key={chat._id}
								className='p-2 pr-4 mb-4 bg-white/30 rounded cursor-pointer flex justify-between items-center'
								onClick={() => handleChatClick(chat)}>

								{/*<div>*/}
								{/*	Product {chat.ad_id } - {}*/}

								{/*	{chat.participants*/}
								{/*		.filter((participant) => participant._id !== userData._id)*/}
								{/*		.map((participant) => participant.username)*/}
								{/*		.join(', ')}*/}
								{/*</div>*/}

								<ChatRowContent chat={chat} />

								<button
									onClick={(e) => {
										e.stopPropagation();
										handleDeleteChat(chat._id);
									}}>
									<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
										<path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M20 20L4 4m16 0L4 20"/>
									</svg>
								</button>
							</li>
						))}

				</ul>
			</div>
		</>
	)}

      {/*<div className='w-2/3'>*/}
      {/*  {selectedChat ? (*/}
      {/*    <ChatRoom chat={selectedChat} userData={userData} />*/}
      {/*  ) : (*/}
      {/*    <div className='flex items-center justify-center h-full'>*/}
      {/*      <p className='text-gray-500'>Select a chat to start messaging</p>*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</div>*/}

    </>
  );
};

export default Chats;
