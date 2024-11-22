import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }
  motivationLevel: string = 'low';
  standingUpTime: number = 0;

  calcStandingTime(mot_lvl: string) {
    if (mot_lvl === 'low') {
      this.standingUpTime =180;
    } else if (mot_lvl === 'medium') {
      this.standingUpTime = 120;
    } else if (mot_lvl === 'high') {
      this.standingUpTime = 60;
    }

  return this.standingUpTime;
  }

}
