import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService } from '../home.service';
import { Profile } from '../../models/ProfileModel';
import { DeskApiService } from '../../services/desk-api.service';
import { response } from 'express';
import { LoginService } from '../../login/login.service';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css'],
})
export class HomeViewComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    public apiDeskService: DeskApiService,
    private loginService: LoginService,
    private timerService: TimerService,
    private cdr: ChangeDetectorRef
  ) {
    this.getDeskPosition();
  }

  profileid: string = '';
  curDeskHeight: number = 68;
  height: number = 68;
  profileTitle: string = '';
  hours: number = 0;
  minutes: number = 0;
  profiles: Profile[] = [];
  defaultProfiles: Profile[] = [];
  motivationLevel: string = '';
  isFormVisible: boolean = false;
  hoursStanding: number = 0;
  minutesStanding: number = 0;
  isStanding: boolean = false;
  editMode!: boolean;

  curProfile!: Profile | undefined;

  private intervalId: any;
  private holdTime: number = 200;
  alertPopupVisible = false;

  async ngOnInit() {
    this.alertPopupVisible = true;
    // Loads the profiles stored in the db
    await this.homeService.getAllProfiles().subscribe({
      next: () => {
        console.log('Profiles loaded successfully:', this.homeService.profiles);
        this.defaultProfiles = this.homeService.defaultProfiles;
        this.profiles = this.homeService.profiles;
      },
      error: (error) => {
        console.error('Error loading profiles:', error);
      },
    });

    await this.homeService.getSelectedProfile().subscribe((profile) => {
      if (profile) {
        profile.selected = true;
        console.log(profile);
        this.cdr.detectChanges();
      }
    });

    this.hours = this.homeService.hours;
    this.minutes = this.homeService.minutes;
    this.hoursStanding = this.homeService.hoursStanding;
    this.minutesStanding = this.homeService.minutesStanding;
    this.motivationLevel = this.homeService.motivationLevel;
  }

  getDeskPosition() {
    this.apiDeskService.getDeskPosition().subscribe({
      next: (response) => {
        console.log('Desk position:', response);
      },
      error: (error) => {
        console.error('Failed to get desk position:', error);
      },
    });
  }

  /* DESK HEIGHT CONTROL BUTTON */

  updateDeskHeight(newHeight: number) {
    //makes it so the desk height is not for example 68.00000000000001
    newHeight = parseFloat(newHeight.toFixed(1));
    try {
      this.apiDeskService.updateDeskPosition(newHeight);
    } catch (error) {
      console.error('Error updating desk height:', error);
    }
  }

  increaseHeight() {
    if (this.curDeskHeight < 132) {
      this.curDeskHeight += 0.1;
      this.updateDeskHeight(this.curDeskHeight);
    }
  }

  decreaseHeight() {
    if (this.curDeskHeight > 68) {
      this.curDeskHeight -= 0.1;
      this.updateDeskHeight(this.curDeskHeight);
    }
  }

  onHoldIncrease() {
    this.clearInterval();
    this.holdTime = 75;

    this.intervalId = setInterval(() => {
      this.curDeskHeight += 0.1;
      this.increaseHeight();
      this.holdTime = Math.max(20, this.holdTime - 20);
      this.clearAndRestartInterval(() => this.onHoldIncrease());
    }, this.holdTime);
    this.updateDeskHeight(this.curDeskHeight);
  }

  onHoldDecrease() {
    this.clearInterval();
    this.holdTime = 75;
    this.intervalId = setInterval(() => {
      this.curDeskHeight -= 0.1;
      this.holdTime = Math.max(20, this.holdTime - 20);
      this.clearAndRestartInterval(() => this.onHoldDecrease());
    }, this.holdTime);
    this.updateDeskHeight(this.curDeskHeight);
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

  /* PROFILE FORM CONTROL */

  profilePopUp() {
    this.isFormVisible = !this.isFormVisible;
  }

  validateHours() {
    this.homeService.validateHours(this.hours);
    this.homeService.validateHours(this.hoursStanding);
  }

  validateMinutes() {
    this.homeService.validateMinutes(this.minutes);
    this.homeService.validateMinutes(this.minutesStanding);
  }

  isFormValid(): boolean {
    //checks if its a default profile
    if (
      this.hours === 0 &&
      this.minutes === 0 &&
      this.hoursStanding === 0 &&
      this.minutesStanding === 0
    ) {
      return true;
    }
    // ensures timed profiles have a standing time and a sitting time
    if (
      this.hoursStanding === 0 &&
      this.minutesStanding === 0 &&
      (this.hours !== 0 || this.minutes !== 0)
    ) {
      alert('Please enter all fields');
      return false;
    }
    return true;
  }

  saveButtonHandler() {
    if (!this.editMode) {
      this.saveProfile();
    }
  }

  /* CRUD PROFILE LOGIC */

  saveProfile() {
    if (this.isFormValid()) {
      const newProfile = this.createProfile();
      if (this.checkForDuplicateProfile(newProfile)) {
        alert('Profile already exists');
        return;
      }
      if (this.homeService.isDefaultProfile(newProfile)) {
        this.homeService.defaultProfiles.push(newProfile);
      } else {
        this.homeService.profiles.push(newProfile);
      }

      this.clearForm();
      this.isFormVisible = false;
    }
  }

  createProfile(): Profile {
    const userid = this.loginService.getUserId();
    if (userid) {
      const { timerStanding, timerSitting } = this.getTimersString();

      if (this.profileTitle === '') {
        this.profileTitle = 'No Title';
      }
      const newProfile: Profile = {
        userId: userid,
        title: this.profileTitle,
        deskHeight: this.height,
        timer_sitting: timerSitting,
        timer_standing: timerStanding,
      };
      this.homeService
        .createProfile(
          newProfile.userId,
          newProfile.title,
          newProfile.deskHeight,
          newProfile.timer_sitting ?? '',
          newProfile.timer_standing ?? ''
        )
        .subscribe({
          next: (response) => {
            newProfile.profileid = response.profileid;
          },
          error: (error) => {
            console.error('Error creating profile:', error);
          },
        });
      return newProfile;
    } else {
      alert('You are not logged in.');
      throw new Error('User is not logged in');
    }
  }

  checkForDuplicateProfile(newProfile: Profile): boolean {
    return this.profiles
      .concat(this.defaultProfiles)
      .some(
        (profile) =>
          profile.userId === newProfile.userId &&
          profile.title === newProfile.title &&
          profile.deskHeight === newProfile.deskHeight &&
          profile.timer_sitting === newProfile.timer_sitting &&
          profile.timer_standing === newProfile.timer_standing
      );
  }

  editProfile(id: number, list: 'default' | 'timed') {
    let profile: Profile | undefined;

    if (list === 'default') {
      profile = this.defaultProfiles[id];
    } else if (list === 'timed') {
      profile = this.profiles[id];
    }

    if (!profile) {
      console.error('Profile not found');
      return;
    }

    // Update the form with the profile values and show it
    this.editMode = true;
    this.updateForm(profile);
    this.profilePopUp();

    console.log('Attempting to edit profile:', profile);
    this.homeService
      .updateProfile(
        Number(this.profileid),
        profile.userId,
        profile.title,
        profile.deskHeight,
        profile.timer_sitting ?? '',
        profile.timer_standing ?? ''
      )
      .subscribe({
        next: (response) => {
          console.log('Profile updated successfully:', response);
          const index = this.profiles.findIndex(
            (profile) => profile.profileid === Number(this.profileid)
          );
          if (index !== -1) {
            this.profiles[index] = {
              ...profile,
              profileid: Number(this.profileid),
            };
          }
          this.clearForm();
          this.isFormVisible = false;
        },
        error: (error) => {
          console.error('Error updating profile:', error);
        },
      });
  }

  clearForm() {
    this.profileid = '';
    this.profileTitle = '';
    this.height = 68;
    this.hours = 0;
    this.minutes = 0;
    this.hoursStanding = 0;
    this.minutesStanding = 0;
    this.editMode = false;
  }

  updateForm(profile: Profile) {
    this.profileid = profile.profileid?.toString() || '';
    this.profileTitle = profile.title;
    this.height = profile.deskHeight;
    const { hours, minutes } = this.homeService.calcHrsMins(
      profile.timer_sitting ?? ''
    );
    this.hours = hours;
    this.minutes = minutes;
    const { hours: hoursStanding, minutes: minuteStanding } =
      this.homeService.calcHrsMins(profile.timer_standing ?? '');
    this.hoursStanding = hoursStanding;
    this.minutesStanding = minuteStanding;
  }

  async deleteProfile(index: number, list: 'default' | 'timed') {
    if (list === 'timed') {
      this.removeProfile(index, this.profiles);
    } else if (list === 'default') {
      this.removeProfile(index, this.defaultProfiles);
    } else {
      alert('Error removing profile');
      console.error('Error removing profile');
    }
  }

  async removeProfile(index: number, array: Profile[]) {
    const profileid = array[index].profileid;
    console.log('Profile ID:', profileid);
    if (profileid !== undefined) {
      await this.homeService.deleteProfile(profileid).subscribe({
        next: () => {
          array.splice(index, 1);
        },
        error: (error) => console.error('Error deleting profile:', error),
      });
    } else {
      console.error('Profile ID is undefined');
    }
  }

  getTimersString(): { timerStanding: string; timerSitting: string } {
    const timerSitting = `${this.hours}h ${this.minutes}m`;
    const timerStanding = `${this.hoursStanding}h ${this.minutesStanding}m`;
    return { timerStanding, timerSitting };
  }

  /* PROFILE SELECTION / TIMERS */

  async profileSelected(profile: Profile) {
    if (this.curProfile === profile) {
      this.curProfile.selected = false;
      this.curProfile = undefined;
      await this.homeService.setProfile(undefined);
      return;
    }
    this.curProfile = profile;

    await this.homeService.setProfile(this.curProfile);
    // Remove 'selected' class from all profiles
    this.defaultProfiles.forEach((p) => (p.selected = false));
    this.profiles.forEach((p) => (p.selected = false));

    // Add 'selected' class to the current profile
    this.curProfile.selected = true;

    if (this.defaultProfiles.includes(this.curProfile)) {
      // Move the desk to the position of the default profile

      this.updateDeskHeight(this.curProfile.deskHeight);

      // Stop any running timers
      this.timerService.stopTimers();
    } else {
      // Start the appropriate timer based on the current state
      this.timerService.timersHandler();
    }
  }

  toggleAlertPopup() {
    this.alertPopupVisible = !this.alertPopupVisible;
  }
}
