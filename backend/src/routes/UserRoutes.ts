import express from 'express';
import UserController from "../controllers/UserController";

const userRoutes = express.Router();
const userController = new UserController();

userRoutes.get('/users', (req, res) => userController.getUsers(req, res));
userRoutes.post('/users', (req, res) => {
    console.log('POST /users route hit');
    userController.createUser(req, res);
});

export default userRoutes;