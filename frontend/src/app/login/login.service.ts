import { Injectable } from '@angular/core';
import { LoginViewComponent } from './login-view/login-view.component';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { User } from '../models/UserModel';
import { response } from 'express';
import { map, Observable, retry } from 'rxjs';
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

    // Check if the username belongs to a manager or user
    let loginUrl = `${this.apiUrl}/user`; // Default user login endpoint
    // If the username matches one in the Manager table, use manager login
    if (username === 'manager1' || username === 'manager2' || username === 'manager3') {
      loginUrl = `${this.apiUrl}/manager`;  // Endpoint for managers
    }

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
      console.log('Error getting isManager permissions. Token is null.');
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
      console.log('Error getting isManager permissions. Token is null.');
      return null;
    }
  }

  getUserId() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser: any = jwtDecode(token);
      return Number(decodedUser.userid);
    } else {
      console.log('Error getting userid permissions. Token is null.');
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
      console.log('Error getting isManager permissions. Token is null.');
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
      console.log('Error getting isManager permissions. Token is null.');
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
}
