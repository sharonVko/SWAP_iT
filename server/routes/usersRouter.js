import { Router } from 'express';
import * as userController from '../controller/users.js';
import verifyToken from '../middleware/verifyToken.js';

const usersRouter = Router();
usersRouter.post('/register', userController.register);
usersRouter.post('/login', userController.login);
usersRouter.get('/me', verifyToken, userController.getUser);
usersRouter.post('/logout', verifyToken, userController.logout);


usersRouter.get('/', userController.getAllUsers);
usersRouter.get('/:id', userController.getSingleUser);

export default usersRouter;