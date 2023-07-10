import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './views/home/home.component'
import { AnnotatorComponent } from './views/annotator/annotator.component'
import { ReviewComponent } from './views/review/review.component'
import { UploadComponent } from './views/upload/upload.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'new',
    component: AnnotatorComponent
  },
  {
    path: 'review',
    component: ReviewComponent
  },
  {
    path: 'upload',
    component: UploadComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnotatorRoutingModule {}
