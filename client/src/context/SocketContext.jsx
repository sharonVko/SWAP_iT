import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) =>
{
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() =>
  {
    const token = Cookies.get('token');
    if (!token) return;

    const newSocket = io(`${import.meta.env.VITE_API_URL}`, {
      transports: ['websocket'],
      query: { token },
    });

    setSocket(newSocket);

    newSocket.on('onlineUsers', (users) =>
    {
      setOnlineUsers(users);
    });

    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
