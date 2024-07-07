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

const server = http.createServer(app); // Creating an HTTP server using the Express application.

// Creating a Socket.IO server attached to the HTTP server with CORS configuration.
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

io.use(authMiddleware); // Middleware to authenticate Socket.IO connections.

//Event listener for new socket connections
io.on('connection', (socket) =>
{
  console.log('a user connected');
  //'joinConversation': Joins the user to a specific conversation room.
  socket.on('joinConversation', (conversationId) => 
  {
    socket.join(conversationId);
  });
  // 'sendMessage': Broadcasts a new message to all users in the conversation room.
  socket.on('sendMessage', (message) =>
  {
    io.to(message.conversationId).emit('newMessage', message);
  });

  // 'disconnect': Logs when a user disconnects.
  socket.on('disconnect', () =>
  {
    console.log('user disconnected');
  });
});


app.use(express.json());
// app.use(cors());
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], credentials: true }));
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



