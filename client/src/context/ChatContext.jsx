import React, { useEffect, useState, createContext, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthProvider';

const Context = createContext();

export const UseContextStore = () => useContext(Context);

export const ChatContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [messageData, setMessageData] = useState([]);
  const [adData, setAdData] = useState([]);
  const [chatData, setChatData] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [loading, setLoading] = useState(true);
  const { userData } = useAuth();

  const addMessage = (newMessage) => {
    setMessageData((prevMessages) => [...prevMessages, newMessage]);
  };

  const updateUserMap = async (userId) => {
    if (typeof userId !== 'string') {
      console.error('Invalid userId:', userId);
      return;
    }

    if (!userMap[userId]) {
      try {
        console.log('Fetching user for ID:', userId); // Debugging line
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${userId}`
        );
        setUserMap((prevUserMap) => ({
          ...prevUserMap,
          [userId]: response.data.username,
        }));
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
  };

  const values = {
    user,
    setUser,
    messageData,
    setMessageData,
    adData,
    setAdData,
    chatData,
    setChatData,
    loading,
    addMessage,
    userMap,
    updateUserMap,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};
