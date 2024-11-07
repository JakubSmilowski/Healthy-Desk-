import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertViewComponent } from './alert-view/alert-view.component';
import { NavigationModule } from '../navigation/navigation.module';


@NgModule({
  declarations: [
    AlertViewComponent
  ],
  imports: [
    CommonModule,
    NavigationModule
  ]
})
export class AlertModule { }
