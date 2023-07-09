import { TestBed } from '@angular/core/testing'

import { DeleteTool } from './delete-tool.service'

describe('DeleteToolService', () => {
  let service: DeleteTool

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(DeleteTool)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
