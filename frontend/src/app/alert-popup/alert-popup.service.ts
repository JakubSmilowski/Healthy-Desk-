import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlertPopupService {

  private showPopUpSubject = new Subject<boolean>();
  showPopUp$ = this.showPopUpSubject.asObservable();
  private alertResponse!: (value: boolean) => void;
  apiUrl = 'http://192.168.0.104/';
  buzzerUrl = 'buzzer.cgi?';
  ledUrl = 'led.cgi?';

  constructor(private http: HttpClient) { }

  onAccept(): boolean {
    console.log("Accepted");
    this.hideAlert();
    this.alertResponse(true);
    return true;
  }

  onDeny(): boolean {
    console.log("Denied clicked");
    this.hideAlert();
    this.alertResponse(false);
    return false;
  }

  userChoice(choice: 'accept' | 'deny'): boolean {
    if (choice === 'accept') {
      this.onAccept();
    } else if (choice === 'deny') {
      this.onDeny();
    }
    this.hideAlert();
    return false;
  }

  displayAlert(): Promise<boolean> {
    this.sendAlert1();
    console.log('DISPLAYING ALERT');
    this.showPopUpSubject.next(true);
    return new Promise((resolve) => {
      this.alertResponse = resolve;
    });
  }

  hideAlert() {
    this.showPopUpSubject.next(false);
  }
  
  sendAlert(param: string) {
    console.log('Playing sound...');
    const url = `${this.apiUrl}${this.buzzerUrl}?${param}`;
    this.http.get(url)
      .subscribe();
  }

  sendAlert1() {
    const currentAlertSount = "soft";
    this.sendAlert(currentAlertSount);
  }

  sendAlert2() {
    const currentAlertSount = "medium";
    this.sendAlert(currentAlertSount);
  }

  sendAlert3() {
    const currentAlertSount = "hard";
    this.sendAlert(currentAlertSount);
  }
}
