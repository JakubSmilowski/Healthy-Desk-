import { Injectable } from '@angular/core';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  hours: number = 0;
  minutes: number = 0;
  userHeight!: number;
  motivationLevel: string = 'soft';
  profiles: Profile[] = [];

  constructor() {
  }
  
  validateHours() {
    if (this.hours > 23) this.hours = 23;
    else if (this.hours < 0) this.hours = 0;
  }

  validateMinutes() {
    if (this.minutes > 59) this.minutes = 59; 
    else if (this.minutes < 0) this.minutes = 0;
  }
  saveDefaultProfile() {
    const time = `${this.hours}h ${this.minutes}m`;

    const newProfile: Profile = {
      title: 'Default Profile',
      height: Math.round(this.userHeight * 0.61),
      time: time,
      motivationLevel: 'soft' //to be assigned from alers
    };

    const sittingProfile: Profile = {
      title: 'Sitting Profile',
      height: Math.round(this.userHeight * 0.43),
      time: time,
      motivationLevel: 'soft' //to be assigned from alers
    };

    this.profiles.push(newProfile);
    this.profiles.push(sittingProfile);

    this.profiles.forEach(profile => {
      console.log(profile)
    });
  }
  isUserStanding(deskHeight: number, standingHeight: number) {
    if((deskHeight > standingHeight - 10) && (deskHeight < standingHeight + 10))
      return true;
    else return false;
  }
}
