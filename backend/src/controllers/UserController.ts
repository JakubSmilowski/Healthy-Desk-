import { User } from "../models/UserModel";
import { Request, Response } from "express";
import UserService from "../services/UserService"; // Adjust the path as necessary

class UserController {
  async getUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send(error);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const { username, email, password, height, mot_lvl } = req.body;
      console.log("Received request to create user with data:", req.body);
      const token = await UserService.createUser(
        username,
        email,
        password,
        height,
        mot_lvl
      );
      res.status(201).json({ success: true, token: token });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send({ success: false, message: error });
    }
  }

  //Log in user

  async loginUser(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      console.log(
        "Received request to check for username and password:",
        req.body
      );
      const token = await UserService.loginUser(username, password);

      // Error when login credentials are wrong
      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "Wrong login credentials" });
      }
      return res.status(200).json({ success: true, token: token });
    } catch (error) {
      console.log("Error in loginUser controller:", error);
      res
        .status(500)
        .send({ success: false, message: "Internal server error" });
    }
  }

  async setCurrentProfile(req: Request, res: Response) {
    try {
      const { userid } = req.params;
      const { profileid } = req.body;
      const curProfile = await UserService.setCurrentProfile(
        Number(userid),
        Number(profileid)
      );
      res.status(200).json({ curProfile });
    } catch (error) {
      console.error("Error setting current profile:", error);
      res.send(error);
    }
  }

  async getCurrentProfile(req: Request, res: Response) {
    try {
      const { userid } = req.params;
      const curProfile = await UserService.getCurrentProfile(Number(userid));
      res.status(200).json({ curProfile });
    } catch (error) {
      console.error("Error fetching current profile:", error);
      res.send(error);
    }
  }

  async updatePassword (req: Request, res: Response) {
    try {
      const { userId, password } = req.body;
      const token = await UserService.updatePassword(userId, password);
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error setting current profile:", error);
      res.send(error);
    }
  }
}

export default UserController;
