import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'angular-highcharts';
import { ManagerViewComponent } from './manager-view/manager-view.component';



@NgModule({
  declarations: [
    ManagerViewComponent
  ],
  imports: [
    CommonModule,
    ChartModule
  ]
})
export class ManagerModule { }
