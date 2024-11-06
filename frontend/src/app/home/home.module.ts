import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeViewComponent } from './home-view/home-view.component';
import { NavigationModule } from '../navigation/navigation.module';
import { AccountPopupModule } from '../account-popup/account-popup.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeViewComponent,
  ],
  imports: [
    CommonModule,
    NavigationModule,
    FormsModule,
    AccountPopupModule,
    SharedModule
  ]
})
export class HomeModule { }
