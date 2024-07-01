import express from 'express';
import './db/dbConnect.js';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/ErrorHandler.js';
import cors from 'cors';

import usersRouter from './routes/usersRouter.js';
import adsRouter from './routes/adsRouter.js';
import mediaRouter from './routes/mediaRouter.js';
import messageRouter from './routes/messageRouter.js';
import chatRouter from './routes/chatRouter.js'


import http from 'http';
import { Server } from 'socket.io';
import authMiddleware from './middleware/authSocket.js';


const app = express();
const PORT = 8000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

io.use(authMiddleware);
io.on('connection', (socket) =>
{
  console.log('a user connected');
  socket.on('joinConversation', (conversationId) =>
  {
    socket.join(conversationId);
  });

  socket.on('sendMessage', (message) =>
  {
    io.to(message.conversationId).emit('newMessage', message);
  });

  socket.on('disconnect', () =>
  {
    console.log('user disconnected');
  });
});


app.use(express.json());
app.use(cors());
app.use(cookieParser()); // Add cookie-parser middleware

// ROUTES
app.use('/users', usersRouter);
app.use('/ads', adsRouter);
app.use('/chats', chatRouter);
app.use('/message', messageRouter)
// app.use('/swaps', swapsRouter);
// app.use('/notifications', notificationsRouter);
// app.use('/taxonomies', taxonomiesRouter);
app.use('/media', mediaRouter);

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));



