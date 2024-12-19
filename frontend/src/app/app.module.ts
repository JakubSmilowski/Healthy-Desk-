import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavigationModule } from './navigation/navigation.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginViewComponent } from './login/login-view/login-view.component';
import { HomeModule } from './home/home.module';
import { FormsModule } from '@angular/forms';
import { AccountPopupModule } from './account-popup/account-popup.module';
import { StreakPopupModule } from './streak-popup/streak-popup.module';
import { RegisterComponent } from './register/register-view/register.component';
import { HttpClientModule } from '@angular/common/http';
import { DeskConnectModule } from './desk-connect/desk-connect.module';
import { ManagerModule } from '../manager/manager.module';
import { TimerService } from './services/timer.service';
import { ScoreModule } from './score/score.module';
import { AlertModule } from './alert/alert.module';
import { AnalyticsModule } from './analytics/analytics.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    RegisterComponent,
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
    DeskConnectModule,
    ManagerModule,
    ScoreModule,
    AlertModule,
    AnalyticsModule,
  ],
  providers: [TimerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
