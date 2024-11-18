import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginViewComponent } from './login-view/login-view.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
