import { TestBed, inject } from '@angular/core/testing';

import { SeenService } from './seen.service';

describe('SeenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeenService]
    });
  });

  it('should be created', inject([SeenService], (service: SeenService) => {
    expect(service).toBeTruthy();
  }));
});
