/* eslint-disable no-useless-escape */
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
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
          `http://localhost:8000/message/${chatId}`,
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
					`http://localhost:8000/users/${receiverId}`, {
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
        'http://localhost:8000/message/',
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
      await axios.delete(`http://localhost:8000/message/${messageId}`, {
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
        <p>Login ...</p>
      ) : (
				<>
					<h1 className="text-center mb-6">Neue Nachricht an {receiver}</h1>
					<div className="bg-white/30 rounded-lg p-4 md:p-8 max-w-[960px] mx-auto flex flex-col">
						<ul className="flex-1">
							{messages.map((msg, index) => (
								<li key={`${msg._id}-${index}`}>
									<strong>{msg.sender_id.username || 'Unknown User'}:</strong>{' '}
									{msg.message}
									<button
										onClick={() => handleDeleteMessage(msg._id)}
										className='m-4 bg-blue-500 p-2'
									>
										Delete
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
