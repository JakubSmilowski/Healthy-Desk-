import { Component } from '@angular/core';
import { LoginService } from '../../app/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrl: './manager-view.component.css'
})
export class ManagerViewComponent {
  constructor(private loginService: LoginService, private router: Router) {}
  
  logoutClicked() {
    this.loginService.logOut();
    this.router.navigate(['/login'])
  }
}
