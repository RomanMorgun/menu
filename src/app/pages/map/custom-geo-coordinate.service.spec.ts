import { TestBed } from '@angular/core/testing';

import { CustomGeoCoordinateService } from './custom-geo-coordinate.service';

describe('CustomGeoCoordinateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomGeoCoordinateService = TestBed.get(CustomGeoCoordinateService);
    expect(service).toBeTruthy();
  });
});
