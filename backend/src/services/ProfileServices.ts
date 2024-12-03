import Profile from "../models/ProfileModel";

class ProfileServices {
  static async getProfiles() {
    try {
      const profiles = await Profile.findAll();
      return profiles;
    } catch (error) {
      console.error("Error fetching profiles:", error);
      throw error;
    }
  }
  
  static async createProfile(
    userid: number,
    title: string,
    deskHeight: number,
    timer_standing: string,
    timer_sitting: string
  ) {
    console.log('Received request..', JSON.stringify({ userid, title, deskHeight, timer_standing, timer_sitting }));
    try {
      const newProfile = await Profile.create({
        userid,
        title,
        deskHeight,
        timer_standing,
        timer_sitting,
      });
      return newProfile;
    } catch (error) {
      console.error("Error creating profile:", error);
      throw error;
    }
  }

  static async updateProfile() {
    
  }

  static async deleteProfile(profileid: string) {
    try {
      console.log('Deleting profile with ID:', profileid);
      const result = await Profile.destroy({
        where: {
          profileid: profileid,
        },
      });
      return result > 0;
  } catch (error) {
      console.error('Error deleting profile:', error);
      throw new Error('Error deleting profile');
  }
}
}

export default ProfileServices;
