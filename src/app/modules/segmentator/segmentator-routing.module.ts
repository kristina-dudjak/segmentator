import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SegmentatorComponent } from './views/segmentator/segmentator.component'

const routes: Routes = [
  {
    path: 'segmentator',
    component: SegmentatorComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegmentatorRoutingModule {}
