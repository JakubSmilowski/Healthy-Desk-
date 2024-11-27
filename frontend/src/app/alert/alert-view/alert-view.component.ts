import { Component } from '@angular/core';
import { AlertModule } from '../alert.module';
import { AlertService } from '../alert.service';
@Component({
  selector: 'app-alert-view',
  templateUrl: './alert-view.component.html',
  styleUrl: './alert-view.component.css'
})
export class AlertViewComponent {
  constructor(private alertService: AlertService) { }
  
  sendAlert1() {
    const currentAlertSount = "low";
    this.alertService.sendAlert(currentAlertSount);
  }

  sendAlert2() {
    const currentAlertSount = "medium";
    this.alertService.sendAlert(currentAlertSount);
  }
  sendAlert3() {
    const currentAlertSount = "high";
    this.alertService.sendAlert(currentAlertSount);
  }
}
