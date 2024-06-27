import { Router } from 'express';
import * as chatController from '../controller/chats.js';
import verifyToken from '../middleware/verifyToken.js';


//routes

const chatRouter = Router();

chatRouter.route('/:id').get(verifyToken, chatController.getChat);

chatRouter.route('/').post(chatController.createChat);

chatRouter.route('/:id').delete(verifyToken, chatController.deleteChat)



export default chatRouter;