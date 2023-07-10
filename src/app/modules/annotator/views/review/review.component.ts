import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { SegmentatorState } from '../../store/segmentator.state'
import { getImage, getImages, getTool } from '../../store/segmentator.selectors'
import { getUserImagesRequest } from '../../store/segmentator.actions'
import { ImageData } from '../../store/segmentator.state'

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  constructor (private store: Store<SegmentatorState>) {}

  public selectedTool$ = this.store.select(getTool)
  public images$ = this.store.select(getImages)
  public image$ = this.store.select(getImage)

  ngOnInit () {
    this.store.dispatch(getUserImagesRequest())
  }

  trackByUrl (index: number, image: ImageData) {
    return image.url
  }
}
