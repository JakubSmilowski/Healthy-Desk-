import Profile from "../models/ProfileModel";

class ProfileServices {
    static async getProfiles() {
        try {
            const profiles = await Profile.findAll();
            return profiles;
        } catch (error) {
            console.error('Error fetching profiles:', error);
            throw error;
        }
    }

    static async createProfile(userid: number, title: string, deskHeight: number, timer_sitting: number) {
        try {
          const newProfile = await Profile.create({ userid, title, deskHeight, timer_sitting });
          return newProfile;
        } catch (error) {
            console.error('Error creating profile:', error);
            throw error;
        }
    }
}

export default ProfileServices;