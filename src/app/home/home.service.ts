import { Injectable } from '@angular/core';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  hours: number = 0;
  minutes: number = 0;
  defaultHeight!: number;
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
    const time = `${this.hours}h${this.minutes}m`;

    const newProfile: Profile = {
      title: 'Default Profile',
      height: this.defaultHeight,
      time: time
    };

    this.profiles.push(newProfile);
    this.clearForm();

    this.profiles.forEach(profile => {
      console.log(profile)
    });
  }

  clearForm() {
    this.defaultHeight = 0;
    this.hours = 0;
    this.minutes = 0;
  }
}
