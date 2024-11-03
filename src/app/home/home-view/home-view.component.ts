import { Component, OnInit } from '@angular/core';
import { HomeModule } from '../home.module';
import { Profile } from '../../models/profile.model';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.css'
})
export class HomeViewComponent implements OnInit{
  constructor(private homeService: HomeService) {}

  curDeskHeight: number = 68;
  height: number = 68;
  profileTitle: string = '';
  hours!: number;
  minutes!: number;
  profiles!: Profile[];
  isFormVisible: boolean = false;

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
      this.curDeskHeight += 1
    } else if (this.curDeskHeight >= 132) {
      this.curDeskHeight = 132
    }
  }

  decreaseHeight() {
    if (this.curDeskHeight > 68) {
      this.curDeskHeight -= 1;
    } else if (this.curDeskHeight <= 68){
      this.curDeskHeight = 68;
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
