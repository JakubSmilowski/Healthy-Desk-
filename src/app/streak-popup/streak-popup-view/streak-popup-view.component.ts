import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-streak-popup-view',
  templateUrl: './streak-popup-view.component.html',
  styleUrl: './streak-popup-view.component.css'
})
export class StreakPopupViewComponent {
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}

