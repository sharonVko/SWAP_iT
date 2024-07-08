import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const ChatRoom = ({ chat, userData }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = useRef(null);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io('http://localhost:9000', {
        query: {
          token: document.cookie.replace(
            /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
            '$1'
          ),
        },
      });

      socket.current.on('newMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/message/${chat._id}`,
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

    socket.current.emit('joinConversation', {
      chatId: chat._id,
      adId: chat.ad_id,
    });

    return () => {
      socket.current.off('newMessage');
      socket.current.emit('leaveConversation', {
        chatId: chat._id,
        adId: chat.ad_id,
      });
    };
  }, [chat]);

  const handleSendMessage = async () => {
    try {
      const newMessageData = {
        chatId: chat._id,
        message: newMessage,
        receiverId: chat.participants.find(
          (participant) => participant._id !== userData._id
        )._id,
        ad_id: chat.ad_id,
      };
      const response = await axios.post(
        'http://localhost:8000/message/',
        newMessageData,
        {
          withCredentials: true,
        }
      );
      setNewMessage('');
      setMessages((prevMessages) => [...prevMessages, response.data]);
      socket.current.emit('sendMessage', response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className='flex flex-col h-full p-4 bg-gray-50'>
      <div className='flex-grow overflow-y-auto mb-4'>
        <ul>
          {messages.map((msg, index) => (
            <li
              key={`${msg._id}-${index}`}
              className={`mb-2 p-2 rounded ${
                msg.sender_id._id === userData._id
                  ? 'bg-blue-100 self-end'
                  : 'bg-gray-200 self-start'
              }`}
            >
              <strong>{msg.sender_id.username || 'Unknown User'}:</strong>{' '}
              {msg.message}
            </li>
          ))}
        </ul>
      </div>
      <div className='flex'>
        <input
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder='Type a message'
          className='flex-grow p-2 border border-gray-300 rounded'
        />
        <button
          onClick={handleSendMessage}
          className='ml-2 bg-green-500 text-white p-2 rounded'
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
