import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeViewComponent } from './home/home-view/home-view.component';
import { LoginViewComponent } from './login/login-view/login-view.component';
import { AlertViewComponent } from './alert/alert-view/alert-view.component';
import { AnalyticsViewComponent } from './analytics/analytics-view/analytics-view.component';
import { ScoreViewComponent } from './score/score-view/score-view.component';
import { RegisterComponent } from './register/register-view/register.component';
import { DeskConnectViewComponent } from './desk-connect/desk-connect-view/desk-connect-view.component';

const routes: Routes = [
  {path: '', component: HomeViewComponent},
  {path: 'login', component: LoginViewComponent},
  {path: 'alert', component: AlertViewComponent},
  {path: 'analytics', component: AnalyticsViewComponent},
  {path: 'score', component: ScoreViewComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'connect', component: DeskConnectViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
