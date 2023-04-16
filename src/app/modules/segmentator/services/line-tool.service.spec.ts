import { TestBed } from '@angular/core/testing'

import { LineTool } from './line-tool.service'

describe('LineDrawService', () => {
  let service: LineTool

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(LineTool)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
