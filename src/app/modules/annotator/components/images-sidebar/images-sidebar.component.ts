import { Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { ImageData, SegmentatorState } from '../../store/segmentator.state'
import { selectImage } from '../../store/segmentator.actions'
import { getImage } from '../../store/segmentator.selectors'

@Component({
  selector: 'app-images-sidebar',
  templateUrl: './images-sidebar.component.html',
  styleUrls: ['./images-sidebar.component.scss']
})
export class ImagesSidebarComponent {
  @Input() images: ImageData[]
  selectedImage$ = this.store.select(getImage)
  constructor (private store: Store<SegmentatorState>) {}

  change (selectedImage: ImageData) {
    this.store.dispatch(selectImage({ selectedImage }))
  }
}
