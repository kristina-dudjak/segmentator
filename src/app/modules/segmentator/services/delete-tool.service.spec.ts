import { TestBed } from '@angular/core/testing';

import { DeleteToolService } from './delete-tool.service';

describe('DeleteToolService', () => {
  let service: DeleteToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
