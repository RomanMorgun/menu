import { TestBed } from '@angular/core/testing';

import { CafeCoordinateService } from './cafe-coordinate.service';

describe('CafeCoordinateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CafeCoordinateService = TestBed.get(CafeCoordinateService);
    expect(service).toBeTruthy();
  });
});
