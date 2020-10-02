import { TestBed } from '@angular/core/testing';

import { CircularDetectionService } from './circular-detection.service';

describe('CircularDetectionService', () => {
  let service: CircularDetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CircularDetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
