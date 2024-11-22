
import Desk from "../models/DeskModel";
import { DeskApiService } from "../services/DeskServices";

class DeskController {
    desks: string[] = [];
    deskInfo!: Desk;
    
    constructor(private deskApiService: DeskApiService) {}

    async loadDesks() {
        const data = await this.deskApiService.getDesks()
        .then(data => {
            this.desks = data;
        })
        .catch(error => {
        console.error("Error loading desks:", error);
        });
    }

    async loadDeskDetails(id: string) {
        const data = await this.deskApiService.getDeskInfo(id)
        .then(data => {
            this.deskInfo = data;
        })
        .catch(error => {
            console.error("Error loading desk info:", error);
        })
    }
}

export default DeskController;