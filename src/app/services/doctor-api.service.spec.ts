import { TestBed } from '@angular/core/testing';

import { DoctorApiService } from './doctor-api.service';

describe('DoctorApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoctorApiService = TestBed.get(DoctorApiService);
    expect(service).toBeTruthy();
  });
});
