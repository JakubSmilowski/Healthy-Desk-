import { TestBed } from '@angular/core/testing';

import { AccountPopupService } from './account-popup.service';

describe('AccountPopupService', () => {
  let service: AccountPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
