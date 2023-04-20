import { Component } from '@angular/core'
import { Tool } from '../../models/Tool'
import { LineTool } from '../../services/line-tool.service'
import { RectTool } from '../../services/rect-tool.service'
import { ToolState } from '../../store/tool.state'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-segmentator',
  templateUrl: './segmentator.component.html',
  styleUrls: ['./segmentator.component.scss']
})
export class SegmentatorComponent {
  constructor (private store: Store<ToolState>) {}

  tools: Tool[] = [new LineTool(), new RectTool()]
  public selectedTool$ = this.store.select(state => state.tool)
}
