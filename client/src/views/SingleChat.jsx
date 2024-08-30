/* eslint-disable no-useless-escape */
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import LoginForm from "../components/LoginForm.jsx";
import { useAuth } from '../context/AuthProvider';

const SingleChat = () => {
  const { chatId, adId, receiverId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
	const [receiver, setReceiver] = useState('');
  const { isLoggedIn, userData } = useAuth();
  const socket = useRef(null);

  useEffect(() => {
    if (!socket.current) {
      // Initialize socket connection only once
      socket.current = io('http://localhost:9000', {
        query: {
          token: document.cookie.replace(
            /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
            '$1'
          ),
        },
      });
      socket.current.on('connect', () => {
        // console.log('user connected');
      });
      socket.current.on('newMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/message/${chatId}`,
          {
            withCredentials: true,
          }
        );
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
    socket.current.emit('joinConversation', { chatId, adId });

    return () => {
      socket.current.off('newMessage');
      socket.current.emit('leaveConversation', { chatId, adId });
    };

  }, [chatId, adId, receiverId]);

	useEffect(() => {
		const fetchReceiver = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/users/${receiverId}`, {
						withCredentials: true,
					}
				);
				setReceiver(response.data.username);
			} catch (error) {
				console.error('Error fetching messages:', error);
			}
		};

		fetchReceiver().then();

	}, [receiverId]);

  const handleSendMessage = async () => {
    try {
      const newMessageData = {
        chatId,
        message: newMessage,
        receiverId,
        ad_id: adId,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/message/`,
        newMessageData,
				{ withCredentials: true }
      );
      setNewMessage('');
      setMessages((prevMessages) => [...prevMessages, response.data]); // Update local state immediately
      socket.current.emit('sendMessage', response.data); // Emit the message to the server
    }
		catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/message/${messageId}`, {
        withCredentials: true,
      });
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== messageId)
      );
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
		<>
      {!isLoggedIn ? (
				<LoginForm target="/" />
      ) : (
				<>
					<h1 className="text-center mb-6">Neue Nachricht an {receiver}</h1>
					<div className="bg-white/30 rounded-lg p-4 md:p-8 max-w-[960px] mx-auto flex flex-col">
						<ul className="flex-1 mb-8 text-lg">
							{messages.map((msg, index) => (
								<li key={`${msg._id}-${index}`} className="flex border-b border-b-teal-700/30">
									<span className="block flex-1 py-6">
										<strong>{msg.sender_id.username || 'Unknown User'}</strong>{' '}<br />
										{msg.message}
									</span>
									<button onClick={() => handleDeleteMessage(msg._id)} className=''>
										<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
											<path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M20 20L4 4m16 0L4 20"/>
										</svg>
									</button>
								</li>
							))}
						</ul>

						<div className="flex gap-4">
							<input
								type='text'
								value={newMessage}
								onChange={(e) => setNewMessage(e.target.value)}
								placeholder='Type a message'
								className="flex-1 form-input"
							/>
							<button onClick={handleSendMessage} className='btn-teal btn-md'>Senden</button>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default SingleChat;
