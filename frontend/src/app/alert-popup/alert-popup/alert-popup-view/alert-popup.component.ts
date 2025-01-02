import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { AlertPopupService } from '../../alert-popup.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-alert-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-popup.component.html',
  styleUrls: ['./alert-popup.component.css']
})
export class AlertPopupComponent implements OnInit {

  showPopUp!: boolean;

  constructor(public alertService: AlertPopupService) { }

  ngOnInit(): void {
    console.log('Subscribing to showPopUp$');
    this.alertService.showPopUp$.subscribe((showPopUp) => {
      console.log('showPopUp$ emitted value:', showPopUp);
      this.showPopUp = showPopUp;
      console.log('showPopUp:', showPopUp);
    });
  }

  userChoice(choice: 'accept' | 'deny'): boolean {
    if (choice === 'accept') {
      this.alertService.onAccept();
      return true;
    } else if (choice === 'deny') {
      this.alertService.onDeny();
      return false;
    }
    return false;
  }
}