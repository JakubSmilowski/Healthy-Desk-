import ProfileServices from "../services/ProfileServices";
import { Response, Request } from "express";

class ProfileController {
    async getProfiles(req: Request, res: Response) {
        try {
            const profiles = await ProfileServices.getProfiles();
            res.json(profiles);
        } catch (error) {
            console.error('Error fetching profiles:', error);
            res.send(error);
        }
    }

    async createProfile (req: Request, res: Response) {
        try {
            const { userid, title, deskHeight, timer_sitting  } = req.body;
            const profiles = await ProfileServices.createProfile(userid, title, deskHeight, timer_sitting);
            res.json(profiles);
        } catch (error) {
            console.error('Error fetching profiles:', error);
            res.send(error);
        }
    }
}

export default ProfileController;