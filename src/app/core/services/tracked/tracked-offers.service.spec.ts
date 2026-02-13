import { TestBed } from '@angular/core/testing';

import { TrackedOffersService } from './tracked-offers.service';

describe('TrackedOffersService', () => {
  let service: TrackedOffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackedOffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
