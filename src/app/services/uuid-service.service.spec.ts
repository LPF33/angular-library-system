import { TestBed } from '@angular/core/testing';

import { UuidServiceService } from './uuid-service.service';

describe('UuidServiceService', () => {
  let service: UuidServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UuidServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
