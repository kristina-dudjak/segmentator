import { Component, Input } from '@angular/core'
import { Tool } from '../../models/Tool'
import { Store } from '@ngrx/store'
import { ToolState } from '../../store/tool.state'
import { toggleTool } from '../../store/tool.actions'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() tools: Tool[]
  @Input() selectedTool: any
  constructor (private store: Store<ToolState>) {}

  change (tool: Tool) {
    this.store.dispatch(toggleTool({ tool }))
  }
}
