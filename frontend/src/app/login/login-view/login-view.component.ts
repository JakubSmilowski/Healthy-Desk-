import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import { LoginModule } from '../login.module';
import { LoginServiceService } from '../login.service';
@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.css'
})

export class LoginViewComponent {
  loginForm; 

  constructor(private formBuilder: FormBuilder, private loginService: LoginServiceService) {
    // Initialize loginForm in the constructor
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // Receive data from the form
  onSubmit() {
    console.log('Form submitted:', this.loginForm.value);
    if(this.loginForm.value.username && this.loginForm.value.password) {
      this.loginService.SubmitLogin(this.loginForm.value.username, this.loginForm.value.password);
    }
    
  }
}