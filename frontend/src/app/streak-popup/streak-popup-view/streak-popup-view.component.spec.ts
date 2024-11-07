import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreakPopupViewComponent } from './streak-popup-view.component';

describe('StreakPopupViewComponent', () => {
  let component: StreakPopupViewComponent;
  let fixture: ComponentFixture<StreakPopupViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StreakPopupViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreakPopupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
