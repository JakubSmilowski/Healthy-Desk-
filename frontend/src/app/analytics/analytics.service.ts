import { Injectable } from '@angular/core';
import { Day } from '../models/DayModel';
import { LoginService } from '../login/login.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Month } from '../models/MonthModel';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private apiUrl = 'http://localhost:3000/api/analytics';

  constructor(private loginService: LoginService, private http: HttpClient) {
  
  }
  getStandingSittingDistribution(userId?: number): Observable<{standing: number, sitting: number}> {
    const currentUserId = userId || this.loginService.getUserId();
    
    if (currentUserId === null) {
      return throwError(() => new Error('User ID is not available'));
    }
  
    return this.http.get<any[]>(`${this.apiUrl}/${currentUserId}/standing-distribution`).pipe(
      map(data => {
        const totalHours = 24;
        const avgStandingHours = data.reduce((acc, day) => acc + day.standing_hrs, 0) / data.length;
        return {
          standing: (avgStandingHours / totalHours) * 100,
          sitting: ((totalHours - avgStandingHours) / totalHours) * 100
        };
      }),
      catchError(error => {
        console.error('Error getting standing distribution:', error);
        return throwError(() => new Error('Error getting standing distribution'));
      })
    );
  }
  async updateDay(timeStanding: number) {
    const userid = this.loginService.getUserId();
    if (userid !== null) {
      const day = this.createDayModel(timeStanding, userid);
      console.log('Sending request to create/update day:', day);
      await this.http.put(`${this.apiUrl}/${Number(userid)}`, day).subscribe({
        next: (response) => console.log('Day created successfully:', response),
        error: (error) => console.error('Error creating day:', error),
      });
    } else {
      console.error('User ID is null');
    }
  }

  createDayModel(timeStanding: number, userid: number): Day {
    // convert time from milliseconds to hours
    const hoursStanding = timeStanding / (1000 * 60 * 60);
    const curDate = new Date();
    const day: Day = {
      userid: Number(userid),
      date: curDate,
      // adds one time_moved to an existing day as well
      times_moved: 1,
      standing_hrs: hoursStanding,
    };
    return day;
  }

  getMonthAnalytics(date: Date): Observable<Month> {
    const curUser = this.loginService.getUserId();
    console.log('date:', date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    console.log('Getting month analytics for:', year, month);
  
    return this.http.get<Month>(`${this.apiUrl}/${curUser}/month`, { params: { year, month } })
      .pipe(
        map(response => {
          console.log(`${date} analytics retrieved successfully:`, response);
          return response;
        }),
        catchError(error => {
          console.error('Error retrieving month analytics:', error);
          return throwError('Error retrieving month analytics');
        })
      );
  }
}