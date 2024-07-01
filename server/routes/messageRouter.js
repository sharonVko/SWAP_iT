import { Router } from 'express';
import * as messageController from '../controller/message.js';
import verifyToken from '../middleware/verifyToken.js';

const messageRouter = Router();

messageRouter.route('/:chatId').get(verifyToken, messageController.getMessages);

messageRouter.route('/').post(verifyToken, messageController.sendMessage);

// messageRouter.route('/:id').put(verifyToken, messageController.updateMessage);

messageRouter.route('/:id').delete(verifyToken, messageController.deleteMessage);
messageRouter.route('/').delete(verifyToken, messageController.deleteMessages);


export default messageRouter;