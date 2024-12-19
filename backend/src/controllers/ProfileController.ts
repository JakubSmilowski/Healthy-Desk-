import ProfileServices from "../services/ProfileServices";
import { Response, Request } from "express";

class ProfileController {
  async getProfiles(req: Request, res: Response) {
    try {
      const { userid } = req.params;
      const profiles = await ProfileServices.getProfiles(parseInt(userid));
      res.json(profiles);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      res.send(error);
    }
  }

  async createProfile(req: Request, res: Response) {
    try {
      const { userid } = req.params;
      const { title, deskHeight, timer_standing, timer_sitting } = req.body;
      const profile = await ProfileServices.createProfile(
        Number(userid),
        title,
        deskHeight,
        timer_standing,
        timer_sitting
      );
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      res.send(error);
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const { userid, profileid } = req.params;
      const { title, deskHeight, timer_sitting, timer_standing } = req.body;
      const updatedProfile = await ProfileServices.updateProfile(
        Number(userid),
        Number(profileid),
        title,
        deskHeight,
        timer_sitting,
        timer_standing
      );
      res.json(updatedProfile);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.send(error);
    }
  }

  async deleteProfile(req: Request, res: Response) {
    try {
      const { userid, profileid } = req.params;
      const deleted = await ProfileServices.deleteProfile(
        Number(userid),
        Number(profileid)
      );
      if (deleted) {
        res
          .status(200)
          .send({ message: `Profile ${profileid} deleted successfully.` });
      } else {
        res.status(404).send({ message: `Profile ${profileid} not found.` });
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
      res.send(error);
    }
  }
}

export default ProfileController;
