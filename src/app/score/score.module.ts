import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreViewComponent } from './score-view/score-view.component';
import { NavigationModule } from '../navigation/navigation.module';


@NgModule({
  declarations: [
    ScoreViewComponent
  ],
  imports: [
    CommonModule,
    NavigationModule
  ]
})
export class ScoreModule { }
