import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPopupViewComponent } from './account-popup-view.component';

describe('AccountPopupViewComponent', () => {
  let component: AccountPopupViewComponent;
  let fixture: ComponentFixture<AccountPopupViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountPopupViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountPopupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
