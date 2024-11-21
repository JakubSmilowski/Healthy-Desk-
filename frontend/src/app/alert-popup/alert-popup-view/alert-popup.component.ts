import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-popup',
  templateUrl: './alert-popup.component.html',
  styleUrl: './alert-popup.component.css'
})
export class AlertPopupComponent implements OnInit {
  showPopup = false;

  ngOnInit(): void {
    this.startPopupTimer();
  }

  startPopupTimer(): void {
      //Timer for popup
      setTimeout(() => {
        this.showPopup = true;
      }, 1000) //Display popup after x amount of sec
  }

  onAccept(): void {
    this.showPopup = false;
    console.log("Accepted");
    this.startPopupTimer();
  }

  onDeny(): void {
    this.showPopup = false;
    console.log("Denied");
    this.startPopupTimer();
  }
}