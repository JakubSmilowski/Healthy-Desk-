import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavigationModule } from './navigation/navigation.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginViewComponent } from './login/login-view/login-view.component';
import { HomeModule } from './home/home.module';
import { FormsModule } from '@angular/forms';
import { AccountPopupModule } from './account-popup/account-popup.module';
import { StreakPopupModule } from './streak-popup/streak-popup.module';
import { RegisterComponent } from './register/register-view/register.component';
import { HttpClientModule } from '@angular/common/http';
import { DeskConnectModule } from './desk-connect/desk-connect.module';
import { AlertPopupComponent } from './alert-popup/alert-popup-view/alert-popup.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    RegisterComponent,
    AlertPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NavigationModule,
    HomeModule,
    FormsModule,
    AccountPopupModule,
    StreakPopupModule,
    DeskConnectModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  
 }
