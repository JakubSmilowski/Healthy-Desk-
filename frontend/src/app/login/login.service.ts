import { Injectable } from '@angular/core';
import { LoginViewComponent } from './login-view/login-view.component';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  defaultHeight!: number;
  constructor() { }
}
