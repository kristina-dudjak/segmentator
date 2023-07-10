import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AnnotatorRoutingModule } from './annotator-routing.module'
import { SharedModule } from 'src/app/shared/shared.module'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { segmentatorFeatureKey } from './store/segmentator.actions'
import { segmentatorReducer } from './store/segmentator.reducer'
import { SegmentatorEffects } from './store/segmentator.effects'
import { HomeComponent } from './views/home/home.component'
import { ImageCardComponent } from './components/image-card/image-card.component'
import { ToolbarComponent } from './components/toolbar/toolbar.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { AnnotatorComponent } from './views/annotator/annotator.component';
import { ReviewComponent } from './views/review/review.component';
import { UploadComponent } from './views/upload/upload.component'

@NgModule({
  declarations: [
    HomeComponent,
    ImageCardComponent,
    ToolbarComponent,
    SidebarComponent,
    AnnotatorComponent,
    ReviewComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    AnnotatorRoutingModule,
    SharedModule,
    StoreModule.forFeature(segmentatorFeatureKey, segmentatorReducer),
    EffectsModule.forFeature([SegmentatorEffects])
  ]
})
export class AnnotatorModule {}
