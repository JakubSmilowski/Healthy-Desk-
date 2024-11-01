import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationViewComponent } from './navigation-view/navigation-view.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDivider, MatDividerModule} from '@angular/material/divider';
@NgModule({
  declarations: [
    NavigationViewComponent,
    
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  exports: [
    NavigationViewComponent
  ]
})
export class NavigationModule {
  

 }
