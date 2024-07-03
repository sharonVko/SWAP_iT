import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UseContextStore } from '../context/ChatContext';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000');

const SingleChat = ({ chatId }) =>
{
	const { user } = UseContextStore();
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');

	useEffect(() =>
	{
		const fetchMessages = async () =>
		{
			try
			{
				const response = await axios.get(`/messages/${chatId}`);
				setMessages(response.data);
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
			const response = await axios.post('/messages', {
				chatId,
				message: newMessage,
				senderId: user._id,  // Make sure the senderId is set correctly
				receiverId: '', // Set this appropriately
			});
			socket.emit('sendMessage', response.data);
			setNewMessage('');
		} catch (error)
		{
			console.error('Error sending message:', error);
		}
	};

	return (
		<div>
			<h2>Messages</h2>
			<ul>
				{messages.map(msg => (
					<li key={msg._id}>
						<strong>{msg.sender_id.name}:</strong> {msg.message}
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
