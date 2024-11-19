import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HomeService } from '../home/home.service';
import { Profile } from '../models/profile.model';
import { User } from '../models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient, private homeService: HomeService) { }

  registerUser(username: string, email: string, password: string, height: number, mot_lvl: 'low' | 'medium' | 'high', avg_standing_hrs: number, times_moved: number, calories_burned: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const newUser = this.newUser(username, email, password, height, mot_lvl, avg_standing_hrs, times_moved, calories_burned);
    
    console.log(`NEW USER: ${JSON.stringify(newUser)}`);

    return this.http.post(`${this.apiUrl}/users`, newUser, { headers }).pipe(
      tap(response => console.log('User created successfully:', response)),
      catchError(error => {
        console.error('Error creating user:', error);
        return throwError(error);
      })
    );
  }

  newUser(username: string, email: string, password: string, height: number, mot_lvl: 'low' | 'medium' | 'high', avg_standing_hrs: number, times_moved: number, calories_burned: number): User {
    const newUser: User = {
      username: username,
      email: email,
      password: password,
      height: height,
      mot_lvl: mot_lvl,
      avg_standing_hrs: avg_standing_hrs,
      times_moved: times_moved,
      calories_burned: calories_burned
    };

    return newUser;
  }

  registerDefaultProfile(hours: number, minutes: number, userHeight: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const newProfile = this.newDefaultProfile(hours, minutes, userHeight);
    
    return this.http.post(`${this.apiUrl}/profiles`, newProfile, { headers });
  }

  newDefaultProfile(hours: number, minutes: number, userHeight: number): Profile {
    const time = `${hours}h ${minutes}m`;

    const newProfile: Profile = {
      title: 'Default Profile',
      deskHeight: Math.round(userHeight * 0.61),
      time: time,
      userid: 3
    };

    this.homeService.profiles.push(newProfile);

    this.homeService.profiles.forEach(profile => {
      console.log(profile)
    });
    
    return newProfile;
  }
}
