import { Component, OnInit } from '@angular/core'; 
import { HomeService } from '../home.service';
import { Profile } from '../../models/profile.model';
import { DeskApiService } from '../../services/desk-api.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {
  constructor(private homeService: HomeService, private apiDeskService: DeskApiService) {}

  curDeskHeight: number = 68;
  height: number = 68;
  profileTitle: string = '';
  hours!: number;
  minutes!: number;
  profiles!: Profile[];
  motivationLevel: string = ''; 
  isFormVisible: boolean = false;

  private intervalId: any;
  private holdTime: number = 200;

  ngOnInit(): void {
    this.hours = this.homeService.hours;
    this.minutes = this.homeService.minutes;
    this.profiles = this.homeService.profiles;
    this.motivationLevel = this.homeService.motivationLevel;
    this.motivationLevel = this.homeService.motivationLevel;
  }

  // updateDeskHeight(){
  //   this.apiDeskService.updateDeskPosition(this.curDeskHeight).subscribe();
  //   console.log("updateDeskHeight is beeing caled with parameters: " + this.curDeskHeight);
  // }

  updateDeskHeight() {
    console.log('Desk height:', this.curDeskHeight); // Debugging line
    this.apiDeskService.updateDeskPosition(this.curDeskHeight).subscribe({
      next: (response) => {
        console.log('Desk position updated successfully:', response);
      },
      error: (error) => {
        console.error('Failed to update desk position:', error);
      }
    });
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
      this.updateDeskHeight();
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
      this.holdTime = Math.max(20, this.holdTime - 20);
      this.clearAndRestartInterval(() => this.onHoldIncrease());
    }, this.holdTime);
    this.updateDeskHeight();
  }

  onHoldDecrease() {
    this.clearInterval();
    this.holdTime = 75;

    this.intervalId = setInterval(() => {
      this.decreaseHeight();
      this.holdTime = Math.max(20, this.holdTime - 20);
      this.clearAndRestartInterval(() => this.onHoldDecrease());
    }, this.holdTime);
    this.updateDeskHeight();
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
      deskHeight: this.height,
      time: time,
      motivationLevel: this.motivationLevel
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
