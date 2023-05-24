import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild
} from '@angular/core'
import { Tool } from '../../models/Tool'

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements OnChanges, AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef
  @Input() tool!: Tool
  @Input() image: string
  @Input() images: string[]
  private canvas!: HTMLCanvasElement
  points: number[][] = []
  rectPoints: number[][] = []

  ngAfterViewInit () {
    this.canvas = this.canvasRef.nativeElement
    this.canvas.addEventListener('mousedown', event => {
      this.tool.draw(event, this.canvas, this.points)
    })
  }

  ngOnChanges () {
    if (this.canvas) {
      switch (this.tool.constructor.name) {
        case 'LineTool': {
          console.log('line')
          this.canvas.addEventListener('mousedown', event => {
            this.tool.draw(event, this.canvas, this.points)
          })
          break
        }
        case 'RectTool': {
          console.log('rect')
          this.canvas.addEventListener('mousedown', event => {
            this.tool.draw(event, this.canvas, this.rectPoints)
          })
        }
      }
    }
  }
}
