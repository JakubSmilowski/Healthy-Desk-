import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../app/login/login.service';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrl: './manager-view.component.css'
})
export class ManagerViewComponent implements OnInit {
  lineChart!: Chart;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.createLineChart();
  }

  createLineChart() {
    const lastThirtyDays = Array.from({length: 30}, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.getTime();
    });

    const usageData = lastThirtyDays.map((date, index) => {
      const isWeekend = new Date(date).getDay() === 0 || new Date(date).getDay() === 6;
      const baseTransitions = isWeekend ? 2 : 4;
      const improvement = Math.min(2, index * 0.07);
      const randomVariation = Math.random() * 2 - 1;
      return [date, Math.max(0, baseTransitions + improvement + randomVariation)];
    });

    const standingMinutesData = lastThirtyDays.map((date, index) => {
      const isWeekend = new Date(date).getDay() === 0 || new Date(date).getDay() === 6;
      const baseMinutes = isWeekend ? 120 : 180;
      const improvement = index * 0.8;
      const randomVariation = Math.random() * 30 - 15;
      return [date, Math.round(baseMinutes + improvement + randomVariation)];
    });

    this.lineChart = new Chart({
      chart: {
        type: 'line',
        backgroundColor: 'transparent'
      },
      title: {
        text: 'Team Health Metrics - Last 30 Days',
        style: {
          color: '#84C6DC',
          fontSize: '24px',
          fontWeight: 'bold'
        }
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        type: 'datetime',
        labels: {
          format: '{value:%b %d}'
        }
      },
      yAxis: [{
        title: {
          text: 'Avg. Sit/Stand Transitions',
          style: { color: '#84C6DC' }
        },
        min: 0
      }, {
        title: {
          text: 'Avg. Standing Minutes',
          style: { color: '#B3E0F3' }
        },
        opposite: true,
        min: 0
      }],
      tooltip: {
        shared: true,
        formatter: function() {
          if (this.x) {
            const date = new Date(this.x);
            let tooltip = `<b>${date.toLocaleDateString()}</b><br/>`;
            const workdayHours = 7.5;
            
            this.points?.forEach(point => {
              if (point && point.y !== undefined && point.y !== null) {
                if(point.series.name === 'Avg. Daily Transitions') {
                  tooltip += `${point.series.name}: ${Number(point.y).toFixed(1)}<br/>`;
                } else {
                  const standingHours = Number(point.y) / 60;
                  const sittingHours = workdayHours - standingHours;
                  
                  tooltip += `Standing Time: ${Math.round(point.y)} min (${standingHours.toFixed(1)} hrs)<br/>`;
                  tooltip += `Sitting Time: ${Math.round(sittingHours * 60)} min (${sittingHours.toFixed(1)} hrs)<br/>`;
                }
              }
            });
            return tooltip;
          }
          return '';
        }
      },
      series: [{
        name: 'Avg. Daily Transitions',
        type: 'line',
        color: '#84C6DC',
        data: usageData
      }, {
        name: 'Avg. Standing Time',
        type: 'line',
        color: '#B3E0F3',
        yAxis: 1,
        data: standingMinutesData
      }]
    });
  }

  logoutClicked() {
    this.loginService.logOut();
    this.router.navigate(['/login'])
  }
}