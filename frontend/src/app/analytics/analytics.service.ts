import { Injectable } from '@angular/core';
import { Day } from '../models/DayModel';
import { LoginService } from '../login/login.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiUrl = 'http://localhost:3000/api/analytics';

  constructor(private loginService: LoginService, private http: HttpClient) { }

  updateDay(hrs: number, calories: number) {
    const userid = this.loginService.getUserId();
    if (userid !== null) {
      const day = this.createDay(hrs, userid, calories);
      this.http.post(`${this.apiUrl}/${Number(userid)}`, day).subscribe({
        next: (response) => console.log('Day created successfully:', response),
        error: (error) => console.error('Error creating day:', error),
      }
      );
    } else {
      console.error('User ID is null');
    }
  }

  createDay(time: number, userid: number, calories: number): Day {
    const hours = time / (1000 * 60 * 60);
    const curDate = new Date();
    const day: Day = {
      userid: Number(userid),
      date: curDate,
      times_moved: 1,
      standing_hrs: hours,
      calories_burned: calories
    };
    return day;
  }
}
