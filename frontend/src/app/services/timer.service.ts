import { Injectable } from '@angular/core';
import { Profile } from '../models/ProfileModel';
import { HomeService } from '../home/home.service';
import { DeskApiService } from './desk-api.service';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  worker!: Worker;
  curProfile!: Profile;
  isStanding: boolean = false;
  sittingHeight!: number;
  isWorkerActive: boolean = false;

  constructor(
    private homeService: HomeService,
    private apiDeskService: DeskApiService,
    private loginService: LoginService
  ) {
    if (typeof Worker !== 'undefined') {
      // Create a new
      this.worker = new Worker(new URL('./timer.worker', import.meta.url));
      this.worker.onmessage = ({ data }) => {
        console.log(`page got message: ${JSON.stringify(data)}`);
        this.isWorkerActive = true;
        this.timerCompleteHandler(data.action);
      };
    } else {
      console.log('web worker not supported in this environment');
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

  checkWorkerStatus(): boolean {
    return this.isWorkerActive;
  }

  async getSelectedProfile(): Promise<Profile | null> {
    return new Promise(async (resolve, reject) => {
      await this.homeService.getSelectedProfile().subscribe({
        next: (profile) => {
          if (!profile) {
            resolve(null);
            return;
          }
          console.log('Current profile:', profile);
          resolve(profile);
        },
        error: (error) => {
          console.error('Error fetching current profile:', error);
          reject(error);
        },
      });
    });
  }

  async timersHandler() {
    const profile = await this.getSelectedProfile();
    if (!profile) {
      console.error('Error: Profile not loaded');
      throw new Error;
    }
    this.sittingHeight = this.loginService.getUserHeight() * 0.43;
    this.curProfile = profile;
    console.log('Profile loaded: ', this.curProfile);
    this.startTimers();
  }

  async startTimers() {
    if (this.isStanding) {
      console.log('changing to height:', this.curProfile.deskHeight);
      await this.startStandingTimer();
    } else if (!this.isStanding) {
      console.log('changing to height:', this.sittingHeight);
      await this.startSittingTimer();
    }
  }

  stopSittingTimer() {
    // Clear any existing timers
    this.worker.postMessage({ action: 'stopSitting' });
  }

  stopStandingTimer() {
    this.worker.postMessage({ action: 'stopStanding' });
  }

  stopTimers() {
    this.stopSittingTimer();
    this.stopStandingTimer();
  }

  async startSittingTimer() {
    try {
      this.isStanding = false;
      console.log('Profile timer sitting:', this.curProfile.timer_sitting);
      const { hours, minutes } = this.homeService.calcHrsMins(
        this.curProfile.timer_sitting ?? ''
      );
      const timerSitting = (hours * 60 + minutes) * 60 * 1000;
      if(timerSitting === 0) {
        alert('Please try again');
        throw new Error;
      }

      // starts the timer in the background
      this.worker.postMessage({
        action: 'startSitting',
        duration: timerSitting,
      });

      // debug
      console.log('Message posted to worker:', {
        action: 'startSitting',
        duration: timerSitting,
      });

      this.isStanding = true;
    } catch (error) {
      alert('Error starting sitting timer');
      console.error('Error starting sitting timer:', error);
    }
  }

  async startStandingTimer() {
    try {
      this.isStanding = true;
      const { hours, minutes } = this.homeService.calcHrsMins(
        this.curProfile.timer_standing ?? ''
      );
      const timerStanding = (hours * 60 + minutes) * 60 * 1000;
      if(timerStanding === 0) {
        alert('Please try again');
        throw Error;
      }
      // starts the timer in the background
      this.worker.postMessage({
        action: 'startStanding',
        duration: timerStanding,
      });

      // debug
      console.log('Message posted to worker:', {
        action: 'startStanding',
        duration: timerStanding,
      });

      // when the timer is complete, update the desk position to sitting

      this.isStanding = false;
    } catch (error) {
      alert('Error starting standing timer');
      console.error('Error starting standing timer:', error);
    }
  }

  timerCompleteHandler(dataType: 'sittingComplete' | 'standingComplete') {
    if (dataType === 'sittingComplete') {
      this.apiDeskService.updateDeskPosition(this.curProfile.deskHeight);
      this.startStandingTimer();
    } else if (dataType === 'standingComplete') {
      this.apiDeskService.updateDeskPosition(this.sittingHeight);
      this.startSittingTimer();
    }
  }
}
