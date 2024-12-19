import { ChangeDetectorRef, Injectable, OnInit } from '@angular/core';
import { Profile } from '../models/ProfileModel';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService implements OnInit {
  hours: number = 0;
  minutes: number = 0;
  hoursStanding: number = 0;
  minutesStanding: number = 0;
  userHeight!: number;
  motivationLevel!: string;
  profiles: Profile[] = [];
  defaultProfiles: Profile[] = [];
  profileid: string = '';
  isUserStanding!: boolean;

  apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private loginService: LoginService) {}

  ngOnInit(): void {
  }

  validateHours(hours: number) {
    if (hours > 23) hours = 23;
    else if (hours < 0) hours = 0;
  }

  validateMinutes(minutes: number) {
    if (minutes > 59) minutes = 59;
    else if (minutes < 0) minutes = 0;
  }

  /* PROFILES CRUD */

  createProfile(
    userid: number,
    title: string,
    deskHeight: number,
    timer_sitting: string,
    timer_standing: string
  ): Observable<any> {
    const profileData = {
      userid,
      title,
      deskHeight,
      timer_sitting,
      timer_standing,
    };
    return this.http
      .post(`${this.apiUrl}/${userid}/profiles`, profileData)
      .pipe(
        tap((response) =>
          console.log('Profile created successfully:', response)
        ),
        catchError((error) => {
          console.error('Error creating profile:', error);
          return error;
        })
      );
  }

  updateProfile(
    profileid: number,
    userid: number,
    title: string,
    deskHeight: number,
    timer_sitting: string,
    timer_standing: string
  ): Observable<any> {
    const profileData = {
      userid,
      title,
      deskHeight,
      timer_sitting,
      timer_standing,
    };
    const url = `${this.apiUrl}/${userid}/profiles/${profileid}`;
    return this.http.put(url, profileData).pipe(
      tap((response) => console.log('Profile updated successfully:', response)),
      catchError((error) => {
        console.error('Error updating profile:', error);
        return throwError(error);
      })
    );
  }

  deleteProfile(profileid: number): Observable<any> {
    const userid = this.loginService.getUserId();
    if (userid) {
      const url = `${this.apiUrl}/${userid}/profiles/${profileid}`;

      return this.http.delete(url).pipe(
        tap(() =>
          console.log(`Profile with ID ${profileid} deleted successfully.`)
        ),
        catchError((error) => {
          console.error('Error deleting profile:', error);
          return error;
        })
      );
    } else {
      return throwError('User not logged in');
    }
  }

  getAllProfiles(): Observable<Profile[]> {
    const userid = this.loginService.getUserId();
    console.log('Fetching profiles for user:', userid);
    return this.http.get<Profile[]>(`${this.apiUrl}/profiles/${userid}`).pipe(
      tap((response) => {
        console.log(response);
        response.forEach((profile) => {
          if (this.isDefaultProfile(profile)) {
            this.defaultProfiles.push(profile);
            console.log('Default profiles:', this.defaultProfiles);
          } else {
            this.profiles.push(profile);
          }
        });
      }),
      catchError((error) => {
        console.error('Error fetching profiles:', error);
        return throwError(error);
      })
    );
  }

  async setProfile(profile: Profile | undefined): Promise<any> {
    const userid = this.loginService.getUserId();
    let profileid: number | undefined;
    if (!userid) {
      return throwError('User not logged in');
    }
    profileid = profile?.profileid;
    if (userid) {
      console.log('Setting profile:', profileid);
      await this.http
        .put<Profile>(`${this.apiUrl}/profiles/${userid}/curProfile`, {
          profileid,
        }).subscribe({
          next: (response) => {
            console.log('Profile set successfully:', response);
          },
          error: (error) => {
            console.error('Error setting profile:', error);
            return throwError(error);
          },
        });
    }
  }

  getSelectedProfile(): Observable<Profile | null> {
    const userid = this.loginService.getUserId();
    if (userid) {
      return this.http.get<{ curProfile: number }>(`${this.apiUrl}/profiles/${userid}/curProfile`).pipe(
        map(response => {
          console.log( 'Response:', response);
          const res = response.curProfile;
          if (res) {
            for (const profile of [...this.defaultProfiles, ...this.profiles]) {
              if (res === profile.profileid) {
                return profile;
              }
            }
          }
          return null;
        }),
        catchError(error => {
          console.error('Error fetching current profile:', error);
          return of(null);
        })
      );
      } else {
        return of(null);
    }
  }

  isDefaultProfile(profile: Profile) {
    const { hours, minutes } = this.calcHrsMins(profile.timer_standing ?? '');
    if (hours === 0 && minutes === 0) {
      return true;
    } else return false;
  }

  calcHrsMins(time: string): { hours: number; minutes: number } {
    const timeFormat = /(\d+)h\s*(\d+)m/;
    // checks if the time is in the correct format
    const matches = time.match(timeFormat);
    if (matches) {
      // Extract hours and minutes from the matched groups
      // the matched groups will be, for example: [ '1h 30m', '1', '30']
      // 10 means that it is converting it to a decimal number
      const hours = parseInt(matches[1], 10);
      const minutes = parseInt(matches[2], 10);
      // Converts to milliseconds
      return { hours, minutes };
    }
    return { hours: 0, minutes: 0 };
  }
}
