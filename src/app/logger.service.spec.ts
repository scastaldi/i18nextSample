import { TestBed } from '@angular/core/testing';

import { LogServiceService } from './logger.service';

describe('LogServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogServiceService = TestBed.get(LogServiceService);
    expect(service).toBeTruthy();
  });
});
