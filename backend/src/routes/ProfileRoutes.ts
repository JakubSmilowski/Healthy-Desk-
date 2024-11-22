import express from 'express';
import ProfileController from '../controllers/ProfileController';

const profileRoutes = express.Router();
const profileController = new ProfileController();

profileRoutes.use('/profiles', profileController.getProfiles);
profileRoutes.post('/profiles', (req, res) => profileController.createProfile(req, res));

export default profileRoutes;