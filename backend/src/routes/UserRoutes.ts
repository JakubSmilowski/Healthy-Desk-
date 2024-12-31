import { Router, Request, Response } from "express";
import UserController from "../controllers/UserController";

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await userController.getUsers(req, res);
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRoutes.post("/users", async (req: Request, res: Response) => {
  try {
    await userController.createUser(req, res);
    res.status(201).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

userRoutes.post("/user", async (req: Request, res: Response) => {
  try {
    await userController.loginUser(req, res);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRoutes.route("/profiles/:userid/curProfile")
  .put(async (req: Request, res: Response) => {
    try {
      await userController.setCurrentProfile(req, res);
    } catch (error) {
      res.status(500).send({ error });
      console.log(error);
    }
  })
  .get(async (req: Request, res: Response) => {
    try {
      await userController.getCurrentProfile(req, res);
    } catch (error) {
      res.status(500).send({ error });
      console.log(error);
    }
  });

  userRoutes.route("/user/changePassword")
  .put(async (req: Request, res: Response) => {
    try {
      await userController.updatePassword(req, res);
    } catch (error) {
      res.status(500).send({ error });
      console.log(error);
    }
  })

export default userRoutes;
