import React, { useEffect, useState, createContext, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthProvider';

const Context = createContext();

export const UseContextStore = () => useContext(Context);

export const ChatContext = ({ children }) =>
{
  const [user, setUser] = useState(null); // Initialize user state as null or an empty object
  const [messageData, setMessageData] = useState([]);
  const [adData, setAdData] = useState([]);
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useAuth();



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
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};
