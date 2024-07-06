import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {UseContextStore} from '../context/ChatContext';
import {io} from 'socket.io-client';
import {useParams} from 'react-router-dom';
import {useAuth} from '../context/AuthProvider';

const socket = io();

const SingleChat = () => {
	//const { user } = UseContextStore();
	const {chatId, adId, receiverId} = useParams();
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const [userMap, setUserMap] = useState({});
	const {isLoggedIn, userData} = useAuth();


	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const response = await axios.get(`http://localhost:8000/message/${chatId}`, {
					withCredentials: true,
				});

				console.log('---->', response.data);

				setMessages(response.data);

				// Fetch users
				const userIds = [...new Set(response.data.map(msg => msg.sender_id))];
				const userResponses = await Promise.all(userIds.map(id => axios.get(`http://localhost:8000/users/${id}`)));
				const userMap = userResponses.reduce((acc, userResponse) => {
					acc[userResponse.data._id] = userResponse.data.username;
					return acc;
				}, {});
				setUserMap(userMap);
			} catch (error) {
				// console.error('Error fetching messages:', error);
			}
		};


		fetchMessages();

	}, [chatId]);

	useEffect(() => {
		socket.emit('joinConversation', chatId);
		socket.on('newMessage', (message) => {
			if (message.chatId === chatId) {
				setMessages((prevMessages) => [...prevMessages, message]);
			}
		});
		return () => {
			socket.off('newMessage');
			socket.emit('leaveConversation', chatId);
		};
	}, [chatId]);

	const handleSendMessage = async () => {
		try {
			// Retrieve receiverId (for demonstration, using a hardcoded value, replace with actual logic)
			// const receiverId = 'RECEIVER_USER_ID'; // Replace with actual receiver user ID logic
			// const ad_id = userData.ads[0]; // Assuming ad_id is the first ad in the user's ads array

			const response = await axios.post(
				'http://localhost:8000/message/', {
					chatId: chatId,
					message: newMessage,
					receiverId: receiverId,
					ad_id: adId,
				},
				{
					withCredentials: true,
				}
			);
			socket.emit('sendMessage', response.data);
			setNewMessage('');
		} catch (error) {
			console.error('Error sending message:', error);
		}
	};

	const handleDeleteMessage = async (messageId) => {
		try {
			await axios.delete(`http://localhost:8000/message/${messageId}`, {
				withCredentials: true,
			});
			setMessages(prevMessages => prevMessages.filter(msg => msg._id !== messageId));
		} catch (error) {
			console.error('Error deleting message:', error);
		}
	};

	return (
		<div>
			{!isLoggedIn ? (
				<p>Login ...</p>
			) : (
				<>
					<h2>Messages</h2>
					<ul>
						{messages.map((msg) => (
							<li key={msg._id}>
								<strong>{userMap[msg.sender_id] || 'Unknown User'}:</strong> {msg.message}
								<button onClick={() => handleDeleteMessage(msg._id)} className='m-4 bg-blue-500 p-2'>Delete</button>
							</li>
						))}
					</ul>
					<div>
						<input
							type="text"
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
							placeholder="Type a message"
						/>
						<button onClick={handleSendMessage} className='m-4 bg-green-500 p-2'>Send</button>
					</div>
				</>
			)}
		</div>
	);
};

export default SingleChat;
