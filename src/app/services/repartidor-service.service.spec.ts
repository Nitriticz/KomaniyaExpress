import { TestBed } from '@angular/core/testing';

import { RepartidorServiceService } from './repartidor-service.service';

describe('RepartidorServiceService', () => {
  let service: RepartidorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepartidorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
