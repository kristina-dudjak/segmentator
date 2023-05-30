import { Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { ImageData, SegmentatorState } from '../../store/segmentator.state'
import { selectImage } from '../../store/segmentator.actions'
import { getImage } from '../../store/segmentator.selectors'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() images: ImageData[]
  selectedImage$ = this.store.select(getImage)
  constructor (private store: Store<SegmentatorState>) {}

  change (selectedImage: string) {
    this.store.dispatch(selectImage({ selectedImage }))
  }
}
