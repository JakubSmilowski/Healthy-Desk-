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
  defaultHeight!: number;

  constructor(private homeService: HomeService, private router: Router) {}

  ngOnInit() {
    this.hours = 0;
    this.minutes = 0;
    this.defaultHeight = 0;
  }
  
  validateHours() {
    this.homeService.hours = this.hours;
    this.homeService.validateHours();
  }

  validateMinutes() {
    this.homeService.minutes = this.minutes;
    this.homeService.validateMinutes();
  }

  login() {
    this.homeService.hours = this.hours;
    this.homeService.minutes = this.minutes;
    this.homeService.defaultHeight = this.defaultHeight;
    this.homeService.saveDefaultProfile();
    this.router.navigate(['']);
  }
}
