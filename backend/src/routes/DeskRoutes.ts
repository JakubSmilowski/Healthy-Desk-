import express from 'express';
import DeskController from '../controllers/DeskControllers';
import { DeskApiService } from '../services/DeskServices';

const deskApiService = new DeskApiService();
const deskController = new DeskController(deskApiService);
const deskRoutes = express.Router();

// Route to get all desks
deskRoutes.get('/desks', async (req, res) => {
    try {
        await deskController.loadDesks();
        res.json(deskController.desks);
    } catch(error) {
        console.error('Error fetching desks:', error);
        res.send('Error fetching desks.');
    }
});

// Route to get details of a specific desk by ID
deskRoutes.get('/desks/:deskId', async (req, res) => {
    const { deskId } = req.params;
    try {
        await deskController.loadDeskDetails(deskId);
        res.json(deskController.deskInfo);
    } catch(error) {
        console.error('Error fetching desk info:', error);
        res.send('Error fetching desk info.');
    }
});

export default deskRoutes;