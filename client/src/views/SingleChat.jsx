import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UseContextStore } from '../context/ChatContext';
import { io } from 'socket.io-client';

const socket = io();

const SingleChat = ({ chatId }) =>
{
	const { user } = UseContextStore();
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	// const { isLoggedIn, userData } = useAuth();
	useEffect(() =>
	{
		const fetchMessages = async () =>
		{
			try
			{
				const response = await axios.get(`http://localhost:8000/message/${chatId}`, {
					withCredentials: true,
				});
				setMessages(response.data);
				console.log(console.data)
			} catch (error)
			{
				console.error('Error fetching messages:', error);
			}
		};

		fetchMessages();
	}, [chatId]);

	useEffect(() =>
	{
		socket.emit('joinConversation', chatId);

		socket.on('newMessage', (message) =>
		{
			if (message.chatId === chatId)
			{
				setMessages((prevMessages) => [...prevMessages, message]);
			}
		});

		return () =>
		{
			socket.off('newMessage');
			socket.emit('leaveConversation', chatId);
		};
	}, [chatId]);

	const handleSendMessage = async () =>
	{
		try
		{
			const response = await axios.post(
				'http://localhost:8000/message/',
				{
					chatId,
					message: newMessage,
					senderId: userData._id,
				},
				{
					withCredentials: true,
				}
			);
			socket.emit('sendMessage', response.data);
			setNewMessage('');
		} catch (error)
		{
			console.error('Error sending message:', error);
		}
	};

	const handleDeleteMessage = async (messageId) =>
	{
		try
		{
			await axios.delete(`http://localhost:8000/message/${messageId}`, {
				withCredentials: true,
			});
			setMessages(prevMessages => prevMessages.filter(msg => msg._id !== messageId));
		} catch (error)
		{
			console.error('Error deleting message:', error);
		}
	};

	return (
		<div>
			<h2>Messages</h2>
			<ul>
				{messages.map((msg) => (
					<li key={msg._id}>
						<strong>{msg.sender_id.name}:</strong> {msg.message}
						<button onClick={() => handleDeleteMessage(msg._id)}>Delete</button>
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
				<button onClick={handleSendMessage}>Send</button>
			</div>
		</div>
	);
};

export default SingleChat;
