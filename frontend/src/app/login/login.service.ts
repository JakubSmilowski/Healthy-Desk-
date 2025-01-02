import { Injectable } from '@angular/core';
import { LoginViewComponent } from './login-view/login-view.component';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { User } from '../models/UserModel';
import { response } from 'express';
import { catchError, map, Observable, retry, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  defaultHeight!: number;
  //keep user data in here as loged in user
  loggedInUser!: User;
  apiUrl = 'http://localhost:3000/api';
  router: any;
  isManager = false;

  constructor(private http: HttpClient) {}

  //Send user data to database
  //Return if user is in database and if credentials are correct
  logIn(
    username: string,
    password: string
  ): Observable<{ success: boolean; token: string }> {
    const body = { username, password };

    return this.http
      .post<{ success: boolean; token: string }>(`${this.apiUrl}/user`, body)
      .pipe(
        map((response) => {
          if (!response || !response.token) {
            return response;
          } else {
            // Token contains managerid/userid, username, email, isManager bool.
            // To get more user info for frontend, search for it in the database with the managerid/userid.
            console.log(response.token);
            localStorage.setItem('token', response.token);

            return response;
          }
        })
      );
  }

  logOut() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    // Checks if the user token is in localStorage (which means that user is logged in)
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  // Decodes the token to receive username. Returns it in a string.
  getCurrentUsername() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser: any = jwtDecode(token);
      return decodedUser.username;
    } else {
      console.log('Error getting the username. Token is null.');
      return null;
    }
  }

  // Decodes the token to receive isManager. Returns it in a bool.
  getIsManager() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser: any = jwtDecode(token);
      return decodedUser.isManager;
    } else {
      console.log('Error getting isManager. Token is null.');
      return null;
    }
  }

  // Decodes the token to receive email. Returns it in a string.
  getEmail() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser: any = jwtDecode(token);
      return decodedUser.email;
    } else {
      console.log('Error getting email. Token is null.');
      return null;
    }
  }

  getUserId() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser: any = jwtDecode(token);
      return Number(decodedUser.userid);
    } else {
      console.log('Error getting userid. Token is null.');
      return null;
    }
  }
  // Decodes the token to receive Streak. Returns it in a string.

  getStreak() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser: any = jwtDecode(token);
      return decodedUser.alert_streak;
    } else {
      console.log('Error getting the streak. Token is null.');
      return null;
    }
  }

  // Decodes the token to receive longest streak. Returns it in a string.
  getLongestStreak() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser: any = jwtDecode(token);
      return decodedUser.longest_streak;
    } else {
      console.log('Error getting the longest streak. Token is null.');
      return null;
    }
  }

  getUserHeight() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser: any = jwtDecode(token);
      return decodedUser.height;
    } else {
      console.log('Error getting user height. Token is null.');
      return null;
    }
  }

  getUserScore() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser: any = jwtDecode(token);
      console.log(decodedUser.score);
      return decodedUser.score;
    } else {
      console.log('Error getting the score. Token is null.');
      return null;
    }
  }

  changePassword(newPassword: string): Observable<string> {
    const userId = this.getUserId();
    if (userId) {
      const url = `${this.apiUrl}/user/changePassword`;
      const payload = { userId: userId, password: newPassword };
      return this.http.put<string>(url, payload).pipe(
        tap((response) => {
          console.log('Password updated successfully.', response);
        }),
        catchError((error) => {
          console.error('Error updating password:', error);
          return throwError(() => error);
        })
      );
    } 
    else {
      return throwError(() => new Error('User not logged in.'));
    }
  }
}
