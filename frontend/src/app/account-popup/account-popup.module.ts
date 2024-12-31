import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPopupViewComponent } from './account-popup-view/account-popup-view.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AccountPopupViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AccountPopupViewComponent
  ]
})
export class AccountPopupModule { }
