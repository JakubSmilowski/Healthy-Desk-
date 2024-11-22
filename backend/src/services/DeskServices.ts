import axios from 'axios';
import Desk from '../models/DeskModel';

export class DeskApiService {
    private apiKey = 'E9Y2LxT4g1hQZ7aD8nR3mWx5P0qK6pV7'
    private apiUrl = `http://localhost:8000/api/v1/${this.apiKey}`
        
    public getApi() : string {
        return this.apiUrl;
    }
        
    async getDesks(): Promise<string[]> {
        try {
            const response = await axios.get<string[]>(`${this.apiUrl}/desks`);
            console.log('Data from external API:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching desks:', error);
            throw error;
        }
    }

    async getDeskInfo(deskId: string): Promise<Desk> {
        const deskUrl = `${this.apiUrl}/desks/${deskId}`;
        try {
            const response = await axios.get<Desk>(deskUrl);
            return response.data;
        } catch (error) {
            console.error('Error fetching desk info:', error);
            throw error;
        }
    }
}