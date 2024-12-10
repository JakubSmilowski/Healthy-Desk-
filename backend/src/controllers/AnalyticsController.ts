import AnalyticsService from "../services/AnalyticsService";
import { Request, Response } from "express";

export class AnalyticsController {
  async createOrUpdateDay(req: Request, res: Response) {
    const { userid } = req.params;
    const { date, standing_hrs, times_moved } = req.body;
    try {
      console.log("Received request..", req.body);
      const newDay = await AnalyticsService.createDay(
        Number(userid),
        date,
        times_moved,
        standing_hrs,
      );
      res.status(201).json(newDay);
    } catch (error) {
      console.error("Error creating day:", error);
      res.status(500).send("Error creating day");
    }
  }
}

export default AnalyticsController;