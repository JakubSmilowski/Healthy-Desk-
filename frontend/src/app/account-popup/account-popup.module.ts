import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPopupViewComponent } from './account-popup-view/account-popup-view.component';

@NgModule({
  declarations: [
    AccountPopupViewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AccountPopupViewComponent
  ]
})
export class AccountPopupModule { }
