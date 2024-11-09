import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeskConnectViewComponent } from './desk-connect-view/desk-connect-view.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    DeskConnectViewComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class DeskConnectModule { }
