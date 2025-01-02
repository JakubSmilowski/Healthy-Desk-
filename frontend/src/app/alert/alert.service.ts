import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private http: HttpClient) { }
  
  apiUrl = 'http://192.168.0.104/';
  buzzerUrl = 'buzzer.cgi?';
  ledUrl = 'led.cgi?';
  
  // motivationLevel: string = 'low';

  calcTimers(mot_lvl: string): {standingUpTime: number, sittingTime: number} {
    let standingUpTime: number = 0;
    let sittingTime: number = 0;
    
    if (mot_lvl === 'low') {
      sittingTime = 10;
      standingUpTime = 180;
    } else if (mot_lvl === 'medium') {
      sittingTime = 20;
      standingUpTime = 120;
    } else if (mot_lvl === 'high') {
      sittingTime = 30;
      standingUpTime = 60;
    }
    return {standingUpTime, sittingTime};
  }

  sendAlert(param: string) {
    console.log('Playing sound...');
    const url = `${this.apiUrl}${this.buzzerUrl}?${param}`;
    this.http.get(url)
      .subscribe();
  }

}
