import { TestBed } from '@angular/core/testing';

import { PaqueteServiceService } from './paquete-service.service';

describe('PaqueteServiceService', () => {
  let service: PaqueteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaqueteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
