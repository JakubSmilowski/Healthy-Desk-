import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertPopupViewComponent } from './alert-popup-view.component';

describe('AlertPopupViewComponent', () => {
  let component: AlertPopupViewComponent;
  let fixture: ComponentFixture<AlertPopupViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertPopupViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertPopupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
