import { Injectable } from '@angular/core';
import { LoginViewComponent } from './login-view/login-view.component';
import { userInfo } from '../models/User';
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  defaultHeight!: number;
  
  logedInUser: userInfo = {
    id: 1,
    username: 'DefaultUser',
    password: 'siema',
    email: 'siema@gmail.com'
  }

  constructor() { 
  }

  //Send user to api

  SubmitLogin(username: string, password: string) {
    console.log('Form submitted:', username, password);

    //Send user to api
  }

  LogedInUser(user: userInfo) {
    this.logedInUser = user;
  }

  //Check if user is in the database

  //if not send user to sign up

  //Show an error message


}
