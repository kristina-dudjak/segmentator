import { Component, Input } from '@angular/core'
import { Tool } from '../../models/Tool'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() tools: Tool[]
  @Input() selectedTool: Tool
  constructor () {}

  change (tool) {
    console.log(this.selectedTool)
    this.selectedTool = tool
    console.log(this.selectedTool)
  }
}
