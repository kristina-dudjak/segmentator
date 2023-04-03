import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'
import { LineDrawService } from '../../services/line-draw.service'

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef
  private canvas!: HTMLCanvasElement

  //will have to change to currently chosen tool, not lineService
  constructor (private lineService: LineDrawService) {}

  ngAfterViewInit () {
    this.canvas = this.canvasRef.nativeElement
    this.lineService.setCanvas(this.canvas)
    this.lineService.setContext(this.canvas.getContext('2d')!)

    this.canvas.addEventListener('mousedown', event => {
      this.lineService.startDrawing(event)
    })
    this.canvas.addEventListener('mousemove', event => {
      this.lineService.draw(event)
    })
    document.addEventListener('keyup', event => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        this.lineService.undoLine(event)
      }
    })
    this.canvas.addEventListener('contextmenu', event => {
      event.preventDefault()
      this.lineService.stopDrawing()
    })
  }
}
