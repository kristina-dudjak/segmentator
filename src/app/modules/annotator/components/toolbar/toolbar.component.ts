import { Component, Input } from '@angular/core'
import { Tool } from '../../models/Tool'
import { Store } from '@ngrx/store'
import { SegmentatorState } from '../../../annotator/store/segmentator.state'
import {
  removeShape,
  toggleTool
} from '../../../annotator/store/segmentator.actions'
import { LineTool } from '../../../annotator/services/line-tool.service'
import { RectTool } from '../../../annotator/services/rect-tool.service'
import { PolygonTool } from '../../../annotator/services/polygon-tool.service'
import { DeleteTool } from '../../../annotator/services/delete-tool.service'
import { ImageData } from '../../models/ImageData'

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

  constructor(private store: Store<SegmentatorState>) {}

  change(tool: Tool) {
    this.store.dispatch(toggleTool({ tool }))
  }

  undo() {
    const image = this.images.find(image => image.url === this.image.url)
    this.store.dispatch(
      removeShape({ image: image, index: image.shapes.length - 1 })
    )
  }

  redo() {}
}
