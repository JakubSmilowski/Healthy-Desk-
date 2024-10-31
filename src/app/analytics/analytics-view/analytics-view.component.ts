import { Component } from '@angular/core';
import { AnalyticsModule } from '../analytics.module';
@Component({
  selector: 'app-analytics-view',
  templateUrl: './analytics-view.component.html',
  styleUrl: './analytics-view.component.css'
})
export class AnalyticsViewComponent {
  
  monthNames: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  public curMonth: string;
  public prevMonth: string;
  public twoMonthsAgo: string;

  constructor() {
    const curDate = new Date();
    const curMonthIndex = curDate.getMonth();

    this.curMonth = this.monthNames[curMonthIndex];
    this.prevMonth = this.monthNames[(curMonthIndex - 1 + 12) % 12];
    this.twoMonthsAgo = this.monthNames[(curMonthIndex - 2 + 12) % 12];
  }
}
