import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { SegmentatorState } from '../../store/segmentator.state'
import { getImage, getImages, getTool } from '../../store/segmentator.selectors'
import { getImagesRequest } from '../../store/segmentator.actions'
import { ImageData } from '../../store/segmentator.state'

@Component({
  selector: 'app-annotator',
  templateUrl: './annotator.component.html',
  styleUrls: ['./annotator.component.scss']
})
export class AnnotatorComponent implements OnInit {
  constructor (private store: Store<SegmentatorState>) {}

  public selectedTool$ = this.store.select(getTool)
  public images$ = this.store.select(getImages)
  public image$ = this.store.select(getImage)

  ngOnInit () {
    this.store.dispatch(getImagesRequest())
  }

  trackByUrl (index: number, image: ImageData): string {
    return image.url
  }
}
