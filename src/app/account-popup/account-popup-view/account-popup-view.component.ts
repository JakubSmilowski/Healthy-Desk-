import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-popup-view',
  templateUrl: './account-popup-view.component.html',
  styleUrls: ['./account-popup-view.component.css']
})
export class AccountPopupViewComponent {

  constructor(private router: Router) {}
  gotoConnect() {
    this.router.navigate(['/connect']);
  }

  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}