import { Component, Input } from '@angular/core'
import { Tool } from '../../models/Tool'
import { Store } from '@ngrx/store'
import { ImageData, SegmentatorState } from '../../store/segmentator.state'
import { removeShape, toggleTool } from '../../store/segmentator.actions'
import { LineTool } from '../../services/line-tool.service'
import { RectTool } from '../../services/rect-tool.service'
import { PolygonTool } from '../../services/polygon-tool.service'
import { DeleteTool } from '../../services/delete-tool.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() selectedTool: Tool
  @Input() images: ImageData[]
  @Input() image: ImageData
  tools: Tool[] = [
    new LineTool(),
    new RectTool(),
    new PolygonTool(),
    new DeleteTool()
  ]

  constructor (private store: Store<SegmentatorState>) {}

  change (tool: Tool) {
    this.store.dispatch(toggleTool({ tool }))
  }

  undo () {
    const image = this.images.find(image => image.url === this.image.url)
    this.store.dispatch(
      removeShape({ image: image, index: image.shapes.length - 1 })
    )
  }

  redo () {}
}
