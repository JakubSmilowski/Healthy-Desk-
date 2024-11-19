import { User } from "../models/UserModel";
import { Request, Response } from 'express';
import UserService from '../services/UserService'; // Adjust the path as necessary

class UserController {
    async getUsers(req: Request, res: Response) {
        try {
            const users = await UserService.getUsers();
            res.json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).send(error);
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const { username, email, password, height, mot_lvl } = req.body;
            console.log('Received request to create user with data:', req.body);
            const newUser = await UserService.createUser(username, email, password, height, mot_lvl);
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send(error);
        }
    }
}

export default UserController;