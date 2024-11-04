import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreakPopupViewComponent } from './streak-popup-view/streak-popup-view.component';


@NgModule({
  declarations: [
    StreakPopupViewComponent
  ],
  imports: [
    CommonModule
  ],
  exports:
  [
    StreakPopupViewComponent
  ]
})
export class StreakPopupModule { }
