import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { SegmentatorState } from '../../store/segmentator.state'
import { getImage, getImages, getTool } from '../../store/segmentator.selectors'
import { getImagesBundleRequest } from '../../store/segmentator.actions'
import { Observable } from 'rxjs'
import { ImageData } from '../../models/ImageData'

@Component({
  selector: 'app-annotator',
  templateUrl: './annotator.component.html',
  styleUrls: ['./annotator.component.scss']
})
export class AnnotatorComponent implements OnInit {
  constructor(private store: Store<SegmentatorState>) {}

  public selectedTool$ = this.store.select(getTool)
  public images$: Observable<ImageData[]>
  public image$ = this.store.select(getImage)

  ngOnInit() {
    this.store.dispatch(getImagesBundleRequest())
    this.images$ = this.store.select(getImages)
  }

  trackByUrl(index: number, image: ImageData): string {
    return image.url
  }
}
