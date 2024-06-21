import { Router } from 'express';
import * as userController from '../controller/users.js';
import verifyToken from '../middleware/verifyToken.js';

const usersRouter = Router();
usersRouter.post('/register', userController.register);
usersRouter.post('/login', userController.login);
usersRouter.get('/me', verifyToken, userController.getUser);
usersRouter.get('/', userController.getAllUsers);
usersRouter.post('/logout', verifyToken, userController.logout);

usersRouter.get('/:id', userController.getSingleUser);

export default usersRouter;