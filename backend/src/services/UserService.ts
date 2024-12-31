import { Manager, User } from "../models/UserModel";
import bcrypt from 'bcrypt';

class UserService {
  //get all users
  static async getUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  //Recive user username and password form frontend and check if credentials are correct
  static async loginUser(username: string, password: string) {
    try {
      //firstly, check for user
      const user = await User.findOne({ where: { username, password } });
      if (!user) {
      //if its not a regular user, check if its a manager account
        const manager = await Manager.findOne({
          where: { username, password },
        });
        if (!manager) {
          console.log("User not found or invalid credentials");
          return null;
        }
        console.log("Manager logged in:", manager.username);

        //compare input password with hashed password
        const isPasswordValid = await bcrypt.compare(password, manager.password);
        if (isPasswordValid) {
          console.log("Invalid password for manager provided");
          return null;
        }

        return manager.generateToken(); //return manager token
      }
      console.log("User logged in:", user.username);

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log("Invalid password for user provided");
        return null;
      }

      return user.generateToken(); //return user token
    } catch (error) {
      console.error("Error in loginUser:", error);
      throw error;
    }
  }

  //create a new user with hashed password
  static async createUser(
    username: string,
    email: string,
    password: string,
    height: number,
    mot_lvl: "low" | "medium" | "high"
  ): Promise<string> {
    try {
      console.log("Creating user with data:", {
        username,
        email,
        password,
        height,
        mot_lvl,
      });

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      //create a new user with hashed password
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword, //store hashed password 
        height,
        mot_lvl,
      });
      console.log("User created:", newUser);
      return newUser.generateToken();
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  //set current profile
  static async setCurrentProfile(userid: number, profileid: number) {
    try {
      const currentProfile = await User.update(
        {
          cur_profile: profileid,
        },
        {
          where: {
            userid: userid,
          },
        }
      );
      console.log("Current profile set:", currentProfile);
      return currentProfile;
    } catch (error) {
      console.error("Error setting current profile:", error);
      throw error;
    }
  }

  //get current profile
  static async getCurrentProfile(userid: number) {
    try {
      const curUser = await User.findOne({
        where: {
          userid: userid,
        },
      });
      if (curUser && curUser.cur_profile) {
        const curProfile = curUser.cur_profile;
        console.log("Current profile:", curProfile);
        return curProfile;
      } 
      return null;
    } catch (error) {
      console.error("Error fetching current profile:", error);
      throw error;
    }
  }

  static async updatePassword(userid: number, password: string) {
    try {
      const result = await User.update(
        {
          password: password,
        },
        {
          where: {
            userid: userid,
          },
        }
      );
      return "success";
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  }
}

export default UserService;
