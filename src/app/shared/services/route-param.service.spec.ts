import { TestBed } from '@angular/core/testing';

import { RouteParamService } from './route-param.service';

describe('RouteParamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteParamService = TestBed.get(RouteParamService);
    expect(service).toBeTruthy();
  });
});
