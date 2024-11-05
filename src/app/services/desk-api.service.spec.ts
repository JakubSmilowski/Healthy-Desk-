import { TestBed } from '@angular/core/testing';

import { DeskApiService } from './desk-api.service';

describe('DeskConnectService', () => {
  let service: DeskApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeskApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
