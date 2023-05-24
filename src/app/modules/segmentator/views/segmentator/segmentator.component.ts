import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { SegmentatorState } from '../../store/segmentator.state'
import { getImagesRequest } from '../../store/segmentator.actions'
import { getImage, getImages, getTool } from '../../store/segmentator.selectors'

@Component({
  selector: 'app-segmentator',
  templateUrl: './segmentator.component.html',
  styleUrls: ['./segmentator.component.scss']
})
export class SegmentatorComponent implements OnInit {
  constructor (private store: Store<SegmentatorState>) {}

  public selectedTool$ = this.store.select(getTool)
  public images$ = this.store.select(getImages)
  public image$ = this.store.select(getImage)

  ngOnInit () {
    this.store.dispatch(getImagesRequest())
  }
}
