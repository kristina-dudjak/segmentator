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

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements AfterViewInit, OnChanges {
  @ViewChild('canvas') canvasRef!: ElementRef
  @Input() tool!: Tool
  private canvas!: HTMLCanvasElement
  points: number[][] = []
  rectPoints: number[][] = []

  ngAfterViewInit () {
    this.canvas = this.canvasRef.nativeElement
    this.canvas.addEventListener('mousedown', event => {
      this.tool.draw(event, this.canvas, this.points)
    })
  }
  ngOnChanges (changes: SimpleChanges) {
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
