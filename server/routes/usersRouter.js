import { Router } from 'express';
import * as userController from '../controller/users.js';
import verifyToken from '../middleware/verifyToken.js';
import upload from '../services/Upload.js';

const usersRouter = Router();
usersRouter.post('/register', userController.register); // register
usersRouter.post('/login', userController.login); // login
usersRouter.get('/me', verifyToken, userController.getUser); // your profile
usersRouter.put('/:id', verifyToken, userController.updateUser); // update user settings
usersRouter.post('/logout', verifyToken, userController.logout); // logout
usersRouter.put('/change-password/:id', verifyToken, userController.changePassword); // change pass
usersRouter.get('/', userController.getAllUsers); // all users
usersRouter.get('/:id', userController.getSingleUser); // user by id

usersRouter.route('/ads/:id').get(userController.getAllAdsByUser);
// usersRouter.route('/').post(verifyToken, upload.array('preferredcats', 20), userController.createUser);
export default usersRouter;