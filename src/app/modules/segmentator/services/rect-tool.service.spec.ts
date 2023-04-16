import { TestBed } from '@angular/core/testing'
import { RectToolService } from './rect-tool.service'

describe('RectDrawService', () => {
  let service: RectToolService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(RectToolService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
