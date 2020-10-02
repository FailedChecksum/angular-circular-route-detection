import { TestBed } from '@angular/core/testing';

import { CircularDetectionGuard } from './circular-detection.guard';

describe('CircularDetectionGuard', () => {
  let guard: CircularDetectionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CircularDetectionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
