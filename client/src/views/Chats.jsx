import { useEffect, useState } from 'react';
import axios from 'axios';
import LoginForm from "../components/LoginForm.jsx";
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Chats = () => {
	const { isLoggedIn, userData } = useAuth();
  const [chatData, setChatData] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('http://localhost:8000/chats/', {
          withCredentials: true,
        });
        setChatData(response.data);
      }
			catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
		if (isLoggedIn) {
			fetchChats().then();
		}
  }, [isLoggedIn]);


  const handleDeleteChat = async (chatId) => {
		console.log(chatId)
		try {
      await axios.delete(`http://localhost:8000/chats/${chatId}`, {
        withCredentials: true,
      });
			alert('Chat was deleted');
      setChatData(prevChatData => prevChatData.filter(chat => chat._id !== chatId));
    }
		catch (error) {
      console.error(`Error deleting chat :`, error);
    }
  };

  const handleToggleSelect = (id) => {
    setChatData(prevChatData =>
      prevChatData.map(chat =>
        chat._id === id ? { ...chat, selectedForDeletion: !chat.selectedForDeletion } : chat
      )
    );
  };

  const handleChatClick = (chatId, adId, receiver) => {
    navigate(`/singlechat/${chatId}/${adId}/${receiver}`);
  };

	if (chatData.length !== 0) {
		console.log(userData);
		console.log(chatData);
	}

	if(!isLoggedIn) {
		return (<LoginForm target="/chats"/>)
	}

	return (
		<div>
			<h1>Nachrichten</h1>
			<ul>
				{chatData &&
					chatData.map((chat) => (

						<li key={chat._id}>
							Ad-ID {chat.ad_id} -

							<span onClick={() => handleChatClick(chat._id, chat.ad_id, chat.participants[1]._id)} style={{ cursor: 'pointer' }}>
								{chat.participants
									.filter((participant) => participant._id !== userData._id)
									.map(participant => participant.username).join(', ')}
							</span>

							<button onClick={() => handleDeleteChat(chat._id, chat.ad_id, chat.participants[1]._id)} className='m-4 bg-blue-500 p-2'>Delete</button>

						{/* <input
						type="checkbox"
						checked={chat.selectedForDeletion || false}
						onChange={() => handleToggleSelect(chat._id)}
					/> */}

						</li>
					))}
			</ul>
		</div>
  );
};

export default Chats;
