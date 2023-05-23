import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SegmentatorRoutingModule } from './segmentator-routing.module'
import { SharedModule } from 'src/app/shared/shared.module'
import { SegmentatorComponent } from './views/segmentator/segmentator.component'
import { ImageCardComponent } from './components/image-card/image-card.component'
import { ToolbarComponent } from './components/toolbar/toolbar.component'
import { ToggleToolDirective } from './directives/toggle-tool.directive'
import { StoreModule } from '@ngrx/store'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { EffectsModule } from '@ngrx/effects'
import { segmentatorFeatureKey } from './store/segmentator.actions'
import { segmentatorReducer } from './store/segmentator.reducer'
import { SegmentatorEffects } from './store/segmentator.effects'

@NgModule({
  declarations: [
    SegmentatorComponent,
    ImageCardComponent,
    ToolbarComponent,
    ToggleToolDirective,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    SegmentatorRoutingModule,
    SharedModule,
    StoreModule.forFeature(segmentatorFeatureKey, segmentatorReducer),
    EffectsModule.forFeature([SegmentatorEffects])
  ]
})
export class SegmentatorModule {}
