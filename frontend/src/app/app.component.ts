import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { LoginService } from './login/login.service';
import { AlertPopupComponent } from './alert-popup/alert-popup/alert-popup-view/alert-popup.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Healthy-Desk';

  @ViewChild(AlertPopupComponent) alertPopupComponent!: AlertPopupComponent;

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkIfNavigationVisible();
      }
    });
  }
  
  constructor(private router: Router, private loginService: LoginService) {}

  isAccountMenuVisible: boolean = false;
  isStreakPopupVisible: boolean = false;
  isNavigationVisible: boolean = false;

  toggleAccountVisibility() {
    this.isAccountMenuVisible = !this.isAccountMenuVisible;
  }

  // streak visibility
  toggleeStreakVisibility() {
    console.log("Streak toggled");
    this.isStreakPopupVisible = !this.isStreakPopupVisible;
    if(this.isAccountMenuVisible){
      this.toggleAccountVisibility();
    }
  }

  checkIfNavigationVisible() {
    if (this.router.url !== '/login' && this.router.url !== '/register' && !this.loginService.getIsManager()) {
      this.isNavigationVisible = true;
    }
    else this.isNavigationVisible = false
  }
}
