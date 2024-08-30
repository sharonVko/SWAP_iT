import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import './db/dbConnect.js';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/ErrorHandler.js';
import cors from 'cors';
import usersRouter from './routes/usersRouter.js';
import adsRouter from './routes/adsRouter.js';
import mediaRouter from './routes/mediaRouter.js';
import messageRouter from './routes/messageRouter.js';
import chatRouter from './routes/chatRouter.js'
import authMiddleware from './middleware/authSocket.js';

const app = express();
const server= http.createServer(app); // Creating an HTTP server using the Express application.

// Creating a Socket.IO server attached to the HTTP server with CORS configuration.
const io = new Server(server, {
  cors: {
    origin: `${process.env.FRONTEND_URL}`,
    methods: ['GET', 'POST']
  }
});

// Middleware to authenticate Socket.IO connections.
io.use(authMiddleware);

// Event listener for new socket connections
io.on('connection', (socket) => {
  console.log('a user connected');

  // 'joinConversation': Joins the user to a specific conversation room.
  socket.on('joinConversation', (conversationId) => {
    socket.join(conversationId);
  });

  // 'sendMessage': Broadcasts a new message to all users in the conversation room.
  socket.on('sendMessage', (message) => {
    io.to(message.chatId).emit('newMessage', message);
  });

  // 'disconnect': Logs when a user disconnects.
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Middleware to pass the io instance to the request object
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.json());
app.use(cors({ origin: `${process.env.FRONTEND_URL}`, credentials: true }));
app.use(cookieParser()); // Add cookie-parser middleware
app.use(errorHandler);

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
server.listen(process.env.PORT, () => console.log(`Server is running on PORT: ${process.env.PORT}`));

io.listen(process.env.IO_PORT);
