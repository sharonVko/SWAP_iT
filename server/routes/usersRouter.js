import { Router } from 'express';
import * as userController from '../controller/users.js';
import verifyToken from '../middleware/verifyToken.js';
import upload from '../services/Upload.js';

const usersRouter = Router();
usersRouter.post('/register', userController.register); // register
usersRouter.post('/login', userController.login); // login
usersRouter.post('/logout', verifyToken, userController.logout); // logout


usersRouter.get('/me', verifyToken, userController.getUser); // your profile
usersRouter.get('/', userController.getAllUsers); // all users
usersRouter.get('/:id', userController.getSingleUser); // user by id
usersRouter.route('/ads/:id').get(verifyToken, userController.getAllAdsByUser);//get all ads posted by specific user


usersRouter.put('/:id', verifyToken, userController.updateUser); // update user settings
usersRouter.put('/change-password/:id', verifyToken, userController.changePassword); // change pass



export default usersRouter;