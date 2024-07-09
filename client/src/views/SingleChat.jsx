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
  }, [chatId, adId]);

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
        {
          withCredentials: true,
        }
      );
      setNewMessage('');
      setMessages((prevMessages) => [...prevMessages, response.data]); // Update local state immediately
      socket.current.emit('sendMessage', response.data); // Emit the message to the server
    } catch (error) {
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
    <div>
      {!isLoggedIn ? (
        <p>Login ...</p>
      ) : (
        <>
          <h2>Messages</h2>
          <ul>
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
