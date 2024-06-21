import { Router } from 'express';
import * as userController from '../controller/users.js';
import verifyToken from '../middleware/verifyToken.js';

const usersRouter = Router();
usersRouter.post('/register', userController.register);



export default usersRouter;