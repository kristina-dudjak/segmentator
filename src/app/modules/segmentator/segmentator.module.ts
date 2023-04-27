import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SegmentatorRoutingModule } from './segmentator-routing.module'
import { SharedModule } from 'src/app/shared/shared.module'
import { SegmentatorComponent } from './views/segmentator/segmentator.component'
import { ImageCardComponent } from './components/image-card/image-card.component'
import { ToolbarComponent } from './components/toolbar/toolbar.component'
import { ImageBundleComponent } from './components/image-bundle/image-bundle.component'
import { ToggleToolDirective } from './directives/toggle-tool.directive'
import { StoreModule } from '@ngrx/store'
import { toolFeatureKey } from './store/tool.actions'
import { toolReducer } from './store/tool.reducer';
import { SidebarComponent } from './components/sidebar/sidebar.component'

@NgModule({
  declarations: [
    SegmentatorComponent,
    ImageCardComponent,
    ToolbarComponent,
    ImageBundleComponent,
    ToggleToolDirective,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    SegmentatorRoutingModule,
    SharedModule,
    StoreModule.forFeature(toolFeatureKey, toolReducer)
  ]
})
export class SegmentatorModule {}
