import { Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  ImageData,
  SegmentatorState
} from '../../../annotator/store/segmentator.state'
import { selectImage } from '../../../annotator/store/segmentator.actions'
import { getImage } from '../../../annotator/store/segmentator.selectors'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() images: ImageData[]
  selectedImage$ = this.store.select(getImage)
  constructor (private store: Store<SegmentatorState>) {}

  change (selectedImage: ImageData) {
    this.store.dispatch(selectImage({ selectedImage }))
  }
}
