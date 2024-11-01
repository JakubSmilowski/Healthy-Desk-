import { Component } from '@angular/core';
import { HomeModule } from '../home.module';
import { Profile } from '../../models/profile.model';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.css'
})
export class HomeViewComponent {
<<<<<<< HEAD
  deskHeight: number = 0;
  height: number = 50;
=======
  height: number = 68;
>>>>>>> f0e9fa22 (Fix analytics section and add default profile (incomplete))
  profileTitle: string = '';
  hours: number = 0;
  minutes: number = 0;
  defaultHeight: number = 0;
  defaultHours: number = 0;
  defaultMinutes: number = 0;

  profiles: Profile[] = [
    { title: 'Default Profile', height: this.defaultHeight, time: `${this.defaultHours}h ${this.defaultMinutes}m` },
  ];

  validateHours() {
    if (this.hours > 23) {
      this.hours = 23;
    } else if (this.hours < 0) {
      this.hours = 0;
    }
  }

  validateMinutes() {
    if (this.minutes > 59) {
      this.minutes = 59;
    } else if (this.minutes < 0) {
      this.minutes = 0;
    }
  }

   increaseHeight() {
    if (this.deskHeight < 100) {
      this.deskHeight += 1;
    }
  }

  decreaseHeight() {
    if (this.deskHeight > 0) {
      this.deskHeight -= 1;
    }
  }

  saveProfile() {
    const time = `${this.hours}h ${this.minutes}m`;

    if (this.profileTitle === '') {
      this.profileTitle = 'No Title';
    }

    const newProfile: Profile = {
      title: this.profileTitle,
      height: this.height,
      time: time
    };

    this.profiles.push(newProfile);

    this.clearForm();
  }

  clearForm() {
    this.profileTitle = '';
    this.height = 0;
    this.hours = 0;
    this.minutes = 0;
  }

  removeProfile(index: number) {
    this.profiles.splice(index, 1);
  }
}
