import { TestBed } from '@angular/core/testing';

import { KlippaService } from './klippa.service';

describe('KlippaService', () => {
  let service: KlippaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KlippaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
