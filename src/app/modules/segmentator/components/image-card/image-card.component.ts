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

  constructor (private store: Store<SegmentatorState>) {}

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
      this.tool.draw(event, this.canvas, this.image, this.store)
    })
  }

  ngOnChanges (change: SimpleChanges) {
    if (this.canvas) {
      this.tool.update(this.canvas, this.image)
    }
  }
}
