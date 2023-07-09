import { TestBed } from '@angular/core/testing'
import { RectTool } from './rect-tool.service'

describe('RectDrawService', () => {
  let service: RectTool

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(RectTool)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
