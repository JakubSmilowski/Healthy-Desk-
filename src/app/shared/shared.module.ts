import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertPopupViewComponent } from '../alertPopup/alert-popup-view/alert-popup-view/alert-popup-view.component';

@NgModule({
    declarations: [
        AlertPopupViewComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertPopupViewComponent
    ]
})
export class SharedModule { }