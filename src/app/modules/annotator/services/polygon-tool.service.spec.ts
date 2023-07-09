import { TestBed } from '@angular/core/testing'

import { PolygonTool } from './polygon-tool.service'

describe('PolygonToolService', () => {
  let service: PolygonTool

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(PolygonTool)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
