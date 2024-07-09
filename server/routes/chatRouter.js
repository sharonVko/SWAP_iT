import { Router } from 'express';
import * as chatController from '../controller/chats.js';
import verifyToken from '../middleware/verifyToken.js';

//routes
const chatRouter = Router();

// get chat by chat id
chatRouter.route('/:id').get(verifyToken, chatController.getChatbyId);

// get all chats of specific user
chatRouter.route('/').get(verifyToken, chatController.getAllChatsForUser);


// create New Chat
chatRouter.route('/').post(verifyToken, chatController.createChat);

// delete chat by id
chatRouter.route('/:id').delete(verifyToken, chatController.deleteChat)

// delete multiple chats
chatRouter.route('/').delete(verifyToken, chatController.deleteChats)

export default chatRouter;

