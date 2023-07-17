import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ImagesSidebarComponent } from './images-sidebar.component'

describe('ImagesSidebarComponent', () => {
  let component: ImagesSidebarComponent
  let fixture: ComponentFixture<ImagesSidebarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImagesSidebarComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(ImagesSidebarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
