import { Component, OnInit } from '@angular/core'
import { Tool } from '../../models/Tool'
import { LineTool } from '../../services/line-tool.service'
import { RectTool } from '../../services/rect-tool.service'
import { Store } from '@ngrx/store'
import { SegmentatorState } from '../../store/segmentator.state'
import { getImagesRequest } from '../../store/segmentator.actions'
import { getImages, getTool } from '../../store/segmentator.selectors'

@Component({
  selector: 'app-segmentator',
  templateUrl: './segmentator.component.html',
  styleUrls: ['./segmentator.component.scss']
})
export class SegmentatorComponent implements OnInit {
  constructor (private store: Store<SegmentatorState>) {}

  public selectedTool$ = this.store.select(getTool)
  public images$ = this.store.select(getImages)
  tools: Tool[] = [new LineTool(), new RectTool()]

  ngOnInit (): void {
    this.store.dispatch(getImagesRequest())
  }
}
