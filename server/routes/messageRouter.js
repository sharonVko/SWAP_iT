import { Router } from 'express';
import * as messageController from '../controller/message.js';
import verifyToken from '../middleware/verifyToken.js';

const messageRouter = Router();

messageRouter.route('/:id').get(verifyToken, messageController.getMessages);

messageRouter.route('/').post(verifyToken, messageController.sendMessage);

messageRouter.route('/:id').put(verifyToken, messageController.updateMessage);


messageRouter.route('/:id').delete(verifyToken, messageController.deleteMessage)


export default messageRouter;