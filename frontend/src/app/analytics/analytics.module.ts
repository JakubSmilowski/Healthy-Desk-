import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsViewComponent } from './analytics-view/analytics-view.component';
import { NavigationModule } from '../navigation/navigation.module';

@NgModule({
  declarations: [
    AnalyticsViewComponent,
  ],
  imports: [
    CommonModule,
    NavigationModule
  ]
})
export class AnalyticsModule { }
