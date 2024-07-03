import React, { useEffect, useState, createContext, useContext } from 'react';
import axios from 'axios';

const Context = createContext();

export const UseContextStore = () => useContext(Context);

export const ChatContext = ({ children }) =>
{
  const [user, setUser] = useState([]);
  const [messageData, setMessageData] = useState([]);
  const [adData, setAdData] = useState([]);
  const [chatData, setChatData] = useState([]);

  useEffect(() =>
  {
    const fetchUser = async () =>
    {
      try
      {
        const response = await axios.get('/users/me'); // Assume this endpoint returns the current user
        setUser(response.data);
      } catch (error)
      {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const values = {
    user,
    setUser,
    messageData,
    setMessageData,
    adData,
    setAdData,
    chatData,
    setChatData,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};
