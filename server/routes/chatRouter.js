import { Router } from 'express';
import * as chatController from '../controller/chats.js';
import verifyToken from '../middleware/verifyToken.js';


//routes

const chatRouter = Router();

chatRouter.route('/:id').get(verifyToken, chatController.getChatbyId);

chatRouter.route('/').post(verifyToken, chatController.createChat);

chatRouter.route('/:id').delete(verifyToken, chatController.deleteChat)



export default chatRouter;

