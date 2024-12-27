import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertViewComponent } from './alert-view/alert-view.component';
import { NavigationModule } from '../navigation/navigation.module';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    AlertViewComponent
  ],
  imports: [
    CommonModule,
    NavigationModule,
    MatExpansionModule
  ]
})
export class AlertModule { }
