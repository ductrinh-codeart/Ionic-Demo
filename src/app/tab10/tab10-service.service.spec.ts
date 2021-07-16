import { TestBed } from '@angular/core/testing';

import { Tab10ServiceService } from './tab10-service.service';

describe('Tab10ServiceService', () => {
  let service: Tab10ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tab10ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
