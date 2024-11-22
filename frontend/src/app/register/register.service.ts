import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HomeService } from '../home/home.service';
import { Profile } from '../models/profile.model';
import { User } from '../models/UserModel';
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  standingUpHours: number = 0;
  standingUpMinutes: number = 0;

  apiUrl = 'http://localhost:3000/api';
  constructor(
    private http: HttpClient, 
    private homeService: HomeService,
    private alertService: AlertService,
    
  ){}

  registerUser(username: string, email: string, password: string, height: number, mot_lvl: 'low' | 'medium' | 'high', avg_standing_hrs: number, times_moved: number, calories_burned: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const newUser = this.newUser(username, email, password, height, mot_lvl, avg_standing_hrs, times_moved, calories_burned);
    
    const standingUpTime = this.alertService.calcStandingTime(newUser.mot_lvl);
    
    this.registerSittingProfile(standingUpTime / 60, standingUpTime % 60, height);
    this.registerStandingProfile(standingUpTime / 60 , standingUpTime % 60, height); 
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

  registerStandingProfile(hours: number, minutes: number, userHeight: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const newProfile = this.newStandingProfile(hours, minutes, userHeight);

    return this.http.post(`${this.apiUrl}/profiles`, newProfile, { headers });
  }

  registerSittingProfile(hours: number, minutes: number, userHeight: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const newProfile = this.newSittingProfile(hours, minutes, userHeight);

    return this.http.post(`${this.apiUrl}/profiles`, newProfile, { headers });
  }





  newStandingProfile(hours: number, minutes: number, userHeight: number): Profile {
    const time = `${hours}h ${minutes}m`;

    const newProfile: Profile = {
      title: 'Standing Profile',
      deskHeight: Math.round(userHeight * 0.61),
      time: time,
      userId: 3,
      profileId: Date.now().toString(),
    };

    this.homeService.profiles.push(newProfile);

    this.homeService.profiles.forEach(profile => {
      console.log(profile)
    });
    
    return newProfile;
  }

  newSittingProfile(hours: number, minutes: number, userHeight: number): Profile {
    const time = `${hours}h ${minutes}m`;

    const newProfile: Profile = {
      title: 'Sitting Profile',
      deskHeight: Math.round(userHeight * 0.43),
      time: time,
      userId: 3,
      profileId: Date.now().toString()
    };

    this.homeService.profiles.push(newProfile);

    this.homeService.profiles.forEach(profile => {
      console.log(profile)
    });
    
    return newProfile;
  }

}
