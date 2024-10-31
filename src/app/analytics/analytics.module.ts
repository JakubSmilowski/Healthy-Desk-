import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsViewComponent } from './analytics-view/analytics-view.component';
import { NavigationModule } from '../navigation/navigation.module';
import { AnalyticsComponent } from './analytics.component';


@NgModule({
  declarations: [
    AnalyticsViewComponent,
    AnalyticsComponent
  ],
  imports: [
    CommonModule,
    NavigationModule
  ]
})
export class AnalyticsModule { }
