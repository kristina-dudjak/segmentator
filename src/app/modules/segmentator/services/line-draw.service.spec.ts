import { TestBed } from '@angular/core/testing';

import { LineDrawService } from './line-draw.service';

describe('LineDrawService', () => {
  let service: LineDrawService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineDrawService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
