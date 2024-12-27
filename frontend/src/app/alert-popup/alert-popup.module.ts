import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertPopupComponent } from './alert-popup-view/alert-popup.component';



@NgModule({
  declarations: [
    AlertPopupComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertPopupComponent
  ]
})
export class AlertPopupModule { }