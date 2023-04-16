import { Component } from '@angular/core'
import { Tool } from '../../models/Tool'
import { LineTool } from '../../services/line-tool.service'
import { RectToolService } from '../../services/rect-tool.service'

@Component({
  selector: 'app-segmentator',
  templateUrl: './segmentator.component.html',
  styleUrls: ['./segmentator.component.scss']
})
export class SegmentatorComponent {
  tools: Tool[] = [new LineTool(), new RectToolService()]
  selectedTool: Tool = new LineTool()
}
