import { Component } from '@angular/core';
import { HomeService } from '../../home/home.service';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  username: string = '';
  email!: string;
  password: string = '';
  height: number = 0;
  hours: number = 0;
  minutes: number = 0;
  mot_lvl!: 'low';

  constructor(private homeService: HomeService, private router: Router, private registerService: RegisterService) {}
  validateHours() {
    this.homeService.validateHours();
  }

  validateMinutes() {
    this.homeService.validateMinutes();
  }

  register(): void {
    let isFilled: boolean = this.checkIfFilled();
    
    if (isFilled === true) {
      let validHeight: boolean = this.validateUserHeight();
      if (validHeight === false) {
        return;
      } else {
        this.registerService.registerUser(this.username, this.email, this.password, this.height, this.mot_lvl, 0, 0, 0).subscribe(response => {
          console.log('User registered:', response);
        }, error => {
          console.error('Error registering user:', error);
        });
        //this.registerService.registerDefaultProfile(this.hours, this.minutes, this.height);
        this.router.navigate(['']);
      }  
    }
  }

  validateUserHeight(): boolean {
    if (this.height < 140 || this.height > 220) {
      alert('Please enter a height between 140 and 220 cm');
      return false;
    }
    return true;
  }

  checkIfFilled(): boolean {
    if (this.username === '' || this.email === '' || this.password === '') {
      alert('Please fill in all fields');
      return false;
    }
    return true;
  }
}
