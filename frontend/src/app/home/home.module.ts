import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeViewComponent } from './home-view/home-view.component';
import { NavigationModule } from '../navigation/navigation.module';
import { AccountPopupModule } from '../account-popup/account-popup.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertPopupModule } from '../alert-popup/alert-popup/alert-popup.module';

@NgModule({
  declarations: [
    HomeViewComponent,
  ],
  imports: [
    CommonModule,
    NavigationModule,
    FormsModule,
    AccountPopupModule,
    HttpClientModule,
    AlertPopupModule
  ]
})
export class HomeModule { }
