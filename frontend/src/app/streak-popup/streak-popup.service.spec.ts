import { TestBed } from '@angular/core/testing';

import { StreakPopupService } from './streak-popup.service';

describe('StreakPopupService', () => {
  let service: StreakPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreakPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
