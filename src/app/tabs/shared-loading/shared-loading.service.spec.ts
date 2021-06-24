import { TestBed } from '@angular/core/testing';

import { SharedLoadingService } from './shared-loading.service';

describe('SharedLoadingService', () => {
  let service: SharedLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
