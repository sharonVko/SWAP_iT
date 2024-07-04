import express from 'express';
import './db/dbConnect.js';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/ErrorHandler.js';
import cors from 'cors';

import usersRouter from './routes/usersRouter.js';
import adsRouter from './routes/adsRouter.js';
import mediaRouter from './routes/mediaRouter.js';
import messageRouter from './routes/messageRouter.js';
import chatRouter from './routes/chatRouter.js';

import http from 'http';
import { Server } from 'socket.io';
import authMiddleware from './middleware/authSocket.js';

const app = express();
const PORT = 8000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.use(authMiddleware);

const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Store the user details in the online users map
  onlineUsers.set(socket.user._id, {
    id: socket.user._id,
    username: socket.user.username,
  });

  // Notify others about the new user
  io.emit('onlineUsers', Array.from(onlineUsers.values()));

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
    console.log(`User ${socket.id} left room ${roomId}`);
  });

  socket.on('sendMessage', (message) => {
    console.log(
      `Message received from ${message.sender} in room ${message.roomId}: ${message.text}`
    );
    io.to(message.roomId).emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    onlineUsers.delete(socket.user._id);
    io.emit('onlineUsers', Array.from(onlineUsers.values()));
  });
});

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/ads', adsRouter);
app.use('/chats', chatRouter);
app.use('/message', messageRouter);
app.use('/media', mediaRouter);

app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
