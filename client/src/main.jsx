import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthProvider.jsx';
import { ChatContext } from './context/ChatContext.jsx';
import { SocketProvider } from './context/SocketContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <SocketProvider>
      <ChatContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChatContext>
    </SocketProvider>
  </AuthProvider>
);
