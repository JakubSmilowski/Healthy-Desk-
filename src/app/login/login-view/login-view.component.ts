import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.css'
})
export class LoginViewComponent implements OnInit {
  hours!: number;
  minutes!: number;
  userHeight!: number;

  constructor(private homeService: HomeService, private router: Router) {}

  ngOnInit() {
    this.hours = 0;
    this.minutes = 0;
    this.userHeight = 0;
  }
  
  validateHours() {
    this.homeService.hours = this.hours;
    this.homeService.validateHours();
  }

  validateMinutes() {
    this.homeService.minutes = this.minutes;
    this.homeService.validateMinutes();
  }

  register() {
    this.homeService.hours = this.hours;
    this.homeService.minutes = this.minutes;
    this.homeService.userHeight = this.userHeight;
    this.homeService.saveDefaultProfile();
    this.router.navigate(['']);
  }
}
