import { TestBed } from '@angular/core/testing';

import { LogedInGuardGuard } from './loged-in-guard.guard';

describe('LogedInGuardGuard', () => {
  let guard: LogedInGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LogedInGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
