import { TestBed } from '@angular/core/testing';

import { PaqueteService } from './paquete-service.service';

describe('PaqueteServiceService', () => {
  let service: PaqueteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaqueteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
