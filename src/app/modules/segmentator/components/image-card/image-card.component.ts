import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core'
import { Tool } from '../../models/Tool'
import { ImageData, SegmentatorState } from '../../store/segmentator.state'
import { Store } from '@ngrx/store'
import { RectTool } from '../../services/rect-tool.service'

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements OnChanges, AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef
  @Input() tool: Tool
  @Input() image: ImageData
  private canvas: HTMLCanvasElement
  private points: number[][] = []
  private isDrawing = false

  constructor (private store: Store<SegmentatorState>) {}

  onMouseDown (event: MouseEvent) {
    this.isDrawing = true
    this.tool.draw(event, this.canvas, this.image, this.store, this.points)
  }

  onMouseMove (event: MouseEvent) {
    if (this.isDrawing) {
      this.tool.draw(event, this.canvas, this.image, this.store, this.points)
    }
  }

  onMouseUp (event: MouseEvent) {
    this.isDrawing = false
    if (this.tool instanceof RectTool) {
      this.tool.draw(event, this.canvas, this.image, this.store, this.points)
    }
  }

  ngAfterViewInit () {
    this.canvas = this.canvasRef.nativeElement
    const img = new Image()
    img.src = this.image.url
    img.addEventListener('load', () => {
      this.canvas.width = img.width
      this.canvas.height = img.height
      this.tool.update(this.canvas, this.image)
    })

    document.addEventListener('keydown', event => {
      this.tool.undo(this.canvas, this.image, this.store, this.points)
    })
  }

  ngOnChanges (change: SimpleChanges) {
    if (this.canvas) {
      this.tool.update(this.canvas, this.image)
      this.points = []
    }
  }
}
