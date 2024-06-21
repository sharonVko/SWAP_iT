import express from 'express';
import './db/dbConnect.js';
import usersRouter from './routes/usersRouter.js';

import { errorHandler } from './middleware/ErrorHandler.js';
import cors from 'cors';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

// ROUTES
app.use('/users', usersRouter);
app.use('/ads', adsRouter);
app.use('/chats', chatsRouter);
app.use('/swaps', swapsRouter);
app.use('/notifications', notificationsRouter);
app.use('/taxonomies', taxonomiesRouter);
app.use('/media', mediaRouter);

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
