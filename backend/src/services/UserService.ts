import { User } from "../models/UserModel";

class UserService {
    static async getUsers() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    static async createUser(username: string, email: string, password: string, height: number, mot_lvl: 'low' | 'medium' | 'high') {
        try {
            console.log('Creating user with data:', { username, email, password, height, mot_lvl });
            const newUser = await User.create({
                username,
                email,
                password,
                height,
                mot_lvl,
                avg_standing_hrs: 0, // Default value
                times_moved: 0, // Default value
                calories_burned: 0 // Default value
            });
            console.log('User created:', newUser);
            return newUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
}

export default UserService;