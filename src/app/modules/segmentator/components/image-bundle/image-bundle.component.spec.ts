import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageBundleComponent } from './image-bundle.component';

describe('ImageBundleComponent', () => {
  let component: ImageBundleComponent;
  let fixture: ComponentFixture<ImageBundleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageBundleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageBundleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
