import { TestBed } from '@angular/core/testing';

import { AlertPopupService } from './alert-popup.service';

describe('AlertPopupService', () => {
  let service: AlertPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
