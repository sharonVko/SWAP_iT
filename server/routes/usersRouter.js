import { Router } from "express";
import * as userController from "../controller/users.js";
import verifyToken from "../middleware/verifyToken.js";
import upload from "../services/Upload.js";

const usersRouter = Router();

usersRouter.post("/register", userController.register); // register
usersRouter.post("/login", userController.login); // login
usersRouter.post("/logout", verifyToken, userController.logout); // logout
usersRouter.post("/change-password", verifyToken, userController.changePassword); // change password

usersRouter.get("/me", verifyToken, userController.getUser); // get your profile
usersRouter.get("/", userController.getAllUsers); // get all users
usersRouter.get("/:id", userController.getSingleUser); // get user by id
usersRouter.get("/ads/:id", verifyToken, userController.getAllAdsByUser); // get all ads posted by specific user

// update user settings
usersRouter.put("/:id", verifyToken, upload.single('img'), userController.updateUser);

// route for toggling favorites
usersRouter.post("/toggle-favorite", verifyToken, userController.toggleFavorite);

export default usersRouter;
