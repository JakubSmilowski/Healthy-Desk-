import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskConnectViewComponent } from './desk-connect-view.component';

describe('DeskConnectViewComponent', () => {
  let component: DeskConnectViewComponent;
  let fixture: ComponentFixture<DeskConnectViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeskConnectViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeskConnectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
