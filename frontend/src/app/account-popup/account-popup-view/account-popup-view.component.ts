import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-account-popup-view',
  templateUrl: './account-popup-view.component.html',
  styleUrls: ['./account-popup-view.component.css']
})
export class AccountPopupViewComponent implements OnInit {

  ngOnInit(): void {
    this.username = this.loginService.getCurrentUsername();
    this.email = this.loginService.getEmail();
    this.isManager = this.loginService.getIsManager();
  }
  constructor(private loginService: LoginService, private router: Router) { }

  username: string = '';
  email: string = '';
  isManager: boolean = false;
  isChangePasswordActive: boolean = false;

  gotoConnect() {
    this.router.navigate(['/connect']);
  }

  gotoLogin() {
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }

  logOut() {
    this.loginService.logOut();
  }

  changePasswordClicked() {
    this.isChangePasswordActive = true;
  }

  newPassword: string = ''
  onSubmitPassword() {
    if(this.newPassword!=='') {
    this.loginService.changePassword(this.newPassword).subscribe(
      (response)  =>  {
        console.log(response);
        this.newPassword = '';
        alert("Password updated succesfully.");
        this.isChangePasswordActive = false;
      })
    } 
    else {
      alert("Password can't be empty!")
    }
  }

  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}