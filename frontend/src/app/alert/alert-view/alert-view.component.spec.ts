import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertViewComponent } from './alert-view.component';

describe('AlertViewComponent', () => {
  let component: AlertViewComponent;
  let fixture: ComponentFixture<AlertViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
