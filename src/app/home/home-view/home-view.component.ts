import { Component, OnInit } from '@angular/core'; 
import { HomeService } from '../home.service';
import { Profile } from '../../models/profile.model';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {
  constructor(private homeService: HomeService) {}

  curDeskHeight: number = 68;
  height: number = 68;
  profileTitle: string = '';
  hours!: number;
  minutes!: number;
  profiles!: Profile[];
  isFormVisible: boolean = false;

  private intervalId: any;
  private holdTime: number = 200; // Initial delay

  ngOnInit(): void {
    this.hours = this.homeService.hours;
    this.minutes = this.homeService.minutes;
    this.profiles = this.homeService.profiles;
  }

  createProfilePopUp() {
    this.isFormVisible = !this.isFormVisible;
  }

  validateHours() {
    this.homeService.validateHours();
  }

  validateMinutes() {
    this.homeService.validateMinutes();
  }

  increaseHeight() {
    if (this.curDeskHeight < 132) {
      this.curDeskHeight += 1;
    }
  }

  decreaseHeight() {
    if (this.curDeskHeight > 68) {
      this.curDeskHeight -= 1;
    }
  }

  onHoldIncrease() {
    this.clearInterval();
    this.holdTime = 75;

    this.intervalId = setInterval(() => {
      this.increaseHeight();
      this.holdTime = Math.max(20, this.holdTime - 20); // Speed up increment
      this.clearAndRestartInterval(() => this.onHoldIncrease());
    }, this.holdTime);
  }

  onHoldDecrease() {
    this.clearInterval();
    this.holdTime = 75;

    this.intervalId = setInterval(() => {
      this.decreaseHeight();
      this.holdTime = Math.max(20, this.holdTime - 20); // Speed up decrement
      this.clearAndRestartInterval(() => this.onHoldDecrease());
    }, this.holdTime);
  }

  clearAndRestartInterval(callback: () => void) {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(callback, this.holdTime);
  }

  clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
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
    this.isFormVisible = false;
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
