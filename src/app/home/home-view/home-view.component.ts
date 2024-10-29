import { Component } from '@angular/core';
import { HomeModule } from '../home.module';
import { Profile } from '../../models/profile.model';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.css'
})
export class HomeViewComponent {
  height: number = 50;
  profileTitle: string = '';
  hours: number = 0;
  minutes: number = 0;

  profiles: Profile[] = [];

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
    if (this.height < 100) {
      this.height += 1;
    }
  }

  decreaseHeight() {
    if (this.height > 0) {
      this.height -= 1;
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

  isAccountMenuVisible: boolean = false;
  
  toggleAccountVisibility() {
    this.isAccountMenuVisible = !this.isAccountMenuVisible;
  }
}
