import { Op, fn, col } from "sequelize";
import sequelize from "../config/sequelize";
import Day from "../models/DayModel";

export class AnalyticsService {
  static async createDay(
    userid: number,
    date: Date,
    times_moved: number,
    standing_hrs: number
  ) {
    const existingDay = await Day.findOne({
      where: {
        date: date,
        userid: userid,
      },
    
    });
    if (existingDay) {
      //if the day already exists, it updates it.
      this.updateDay(existingDay, standing_hrs, times_moved);
      return existingDay;
    }
    try {
      console.log("Creating day..", date);
      const newDay = await Day.create({
        userid: userid,
        date: date,
        times_moved: times_moved,
        standing_hrs: Math.round(standing_hrs),
      });
      console.log("Day created successfully");
      return newDay;
    } catch (error) {
      console.error("Error creating day:", error);
      throw error;
    }
  }

  static async updateDay(
    existingDay: Day,
    addedHrs: number,
    addedTimesMoved: number
  ): Promise<Day> {
    try {
      console.log("Updating day..", existingDay);
      existingDay.update({
        standing_hrs: Math.round(existingDay.getStandingHrs() + addedHrs),
        times_moved: Math.round(existingDay.getTimesMoved() + addedTimesMoved),
      });
      console.log("Day updated successfully");
      return existingDay;
    } catch (error) {
      console.error("Error updating day:", error);
      throw error;
    }
  }

    static async getMonthAnalytics(
    userid: number,
    year: number,
    month: number
  ): Promise<{ totalTimesMoved: number; avgStandingHrs: number }> {
    try {
      console.log("Getting month analytics..", year + "-" + month);

      const daysOfMonth = await Day.findAll({
        where: {
          [Op.and]: [
            sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM date')), year),
            sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM date')), month),
            { userid: userid }
          ]
        },
      });
      console.log("Days of month:", daysOfMonth);
      return this.calculateMonthAnalytics(daysOfMonth);
    } catch (error) {
      console.error("Error getting month analytics:", error);
      throw error;
    }
  }

  static calculateMonthAnalytics(daysOfMonth: Day[]): {
    totalTimesMoved: number;
    avgStandingHrs: number;
  } {
    const totalTimesMoved = daysOfMonth.reduce(
      (sum, day) => sum + day.getTimesMoved(),
      0
    );
    const avgStandingHrs =
      daysOfMonth.reduce((sum, day) => sum + day.getStandingHrs(), 0) /
      daysOfMonth.length;
      console.log("Month analytics calculated:", totalTimesMoved, avgStandingHrs);
    return { totalTimesMoved, avgStandingHrs };
  }
  static async getStandingDistribution(userid: number): Promise<{standing_hrs: number}[]> {
    try {
      console.log("Getting standing distribution for user:", userid);
      
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
      const days = await Day.findAll({
        where: {
          userid: userid,
          date: {
            [Op.gte]: thirtyDaysAgo
          }
        }
      });
  
      const daysData = days.map(day => ({
        standing_hrs: day.getStandingHrs()
      }));
  
      console.log("Standing distribution data retrieved:", daysData);
      return daysData;
    } catch (error) {
      console.error("Error getting standing distribution:", error);
      throw error;
    }
  }
}



export default AnalyticsService;
