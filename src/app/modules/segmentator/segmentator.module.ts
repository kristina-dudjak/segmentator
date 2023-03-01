import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegmentatorRoutingModule } from './segmentator-routing.module';
import { SegmentatorComponent } from './views/segmentator/segmentator.component';


@NgModule({
  declarations: [
    SegmentatorComponent
  ],
  imports: [
    CommonModule,
    SegmentatorRoutingModule
  ]
})
export class SegmentatorModule { }
