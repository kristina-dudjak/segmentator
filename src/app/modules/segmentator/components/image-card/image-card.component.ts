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
  rectPoints: number[][] = []
  isDrawing = false

  constructor (private store: Store<SegmentatorState>) {}

  onMouseDown (event: MouseEvent) {
    this.isDrawing = true
    this.tool.draw(event, this.canvas, this.image, this.store, this.isDrawing)
  }

  onMouseMove (event: MouseEvent) {
    if (this.isDrawing) {
      this.tool.draw(event, this.canvas, this.image, this.store, this.isDrawing)
    }
  }

  onMouseUp () {
    this.isDrawing = false
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
    this.canvas.addEventListener('mousedown', event => {
      this.tool.draw(event, this.canvas, this.image, this.store, this.isDrawing)
    })

    this.canvas.tabIndex = 0

    document.addEventListener('keydown', event => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        this.tool.undo(this.image, this.store)
        this.tool.update(this.canvas, this.image)
      }
    })
  }

  ngOnChanges (change: SimpleChanges) {
    if (this.canvas) {
      this.tool.update(this.canvas, this.image)
    }
  }
}
