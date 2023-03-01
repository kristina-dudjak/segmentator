import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentatorComponent } from './segmentator.component';

describe('SegmentatorComponent', () => {
  let component: SegmentatorComponent;
  let fixture: ComponentFixture<SegmentatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmentatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegmentatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
