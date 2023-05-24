import { Component, Input } from '@angular/core'
import { Tool } from '../../models/Tool'
import { Store } from '@ngrx/store'
import { SegmentatorState } from '../../store/segmentator.state'
import { toggleTool } from '../../store/segmentator.actions'
import { LineTool } from '../../services/line-tool.service'
import { RectTool } from '../../services/rect-tool.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() selectedTool: Tool
  tools: Tool[] = [new LineTool(), new RectTool()]

  constructor (private store: Store<SegmentatorState>) {}

  change (tool: Tool) {
    this.store.dispatch(toggleTool({ tool }))
  }
}
