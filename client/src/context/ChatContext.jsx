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
  const [loading, setLoading] = useState(true);
  const { userData } = useAuth();

  const addMessage = (newMessage) => {
    setMessageData((prevMessages) => [...prevMessages, newMessage]);
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
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};
