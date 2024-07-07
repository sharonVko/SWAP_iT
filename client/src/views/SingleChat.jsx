import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UseContextStore } from '../context/ChatContext';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const socket = io();

const SingleChat = () => {
  const { chatId, adId, receiverId } = useParams();
  const [newMessage, setNewMessage] = useState('');
  const { isLoggedIn, userData } = useAuth();
  const { messageData, setMessageData, addMessage, userMap, updateUserMap } =
    UseContextStore();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/message/${chatId}`,
          {
            withCredentials: true,
          }
        );

        setMessageData(response.data);

        // Fetch users
        const userIds = [...new Set(response.data.map((msg) => msg.sender_id))];
        await Promise.all(userIds.map((id) => updateUserMap(id)));
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [chatId, setMessageData, updateUserMap]);

  useEffect(() => {
    socket.emit('joinConversation', chatId);
    socket.on('newMessage', async (message) => {
      if (message.chatId === chatId) {
        await updateUserMap(message.sender_id);
        addMessage(message);
      }
    });
    return () => {
      socket.off('newMessage');
      socket.emit('leaveConversation', chatId);
    };
  }, [chatId, addMessage, updateUserMap]);

  const handleSendMessage = async () => {
    try {
      const newMessageData = {
        chatId: chatId,
        message: newMessage,
        receiverId: receiverId,
        ad_id: adId,
      };
      console.log('Sending message:', newMessageData);
      const response = await axios.post(
        'http://localhost:8000/message/',
        newMessageData,
        {
          withCredentials: true,
        }
      );
      await updateUserMap(response.data.sender_id);
      socket.emit('sendMessage', response.data);
      setNewMessage('');
      addMessage(response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await axios.delete(`http://localhost:8000/message/${messageId}`, {
        withCredentials: true,
      });
      setMessageData((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== messageId)
      );
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
            {messageData.map((msg, index) => (
              <li key={`${msg._id}-${index}`}>
                <strong>{userMap[msg.sender_id] || 'Unknown User'}:</strong>{' '}
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
          <div>
            <input
              type='text'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder='Type a message'
            />
            <button
              onClick={handleSendMessage}
              className='m-4 bg-green-500 p-2'
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleChat;
