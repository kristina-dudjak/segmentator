import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'
import * as d3 from 'd3'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef
  private canvas!: HTMLCanvasElement
  private context!: CanvasRenderingContext2D
  private isDrawing = false
  private lines: any[] = []
  private currentLine: any
  private isImageLoaded = false

  constructor () {}

  ngAfterViewInit (): void {
    this.canvas = this.canvasRef.nativeElement
    this.context = this.canvas.getContext('2d')!
    this.canvas.width = 1000
    this.canvas.height = 500
    this.isImageLoaded = false

    const img = new Image()
    img.src = '../assets/background.png'
    img.onload = () => {
      this.isImageLoaded = true
      this.context.drawImage(img, 0, 0)
    }
    this.canvas.addEventListener('mousedown', this.startDrawing.bind(this))
    this.canvas.addEventListener('mousemove', this.draw.bind(this))
    this.canvas.addEventListener('mouseup', this.endDrawing.bind(this))
    this.canvas.addEventListener('mouseleave', this.endDrawing.bind(this))
  }

  private startDrawing (event: MouseEvent): void {
    this.isDrawing = true
    const [x, y] = d3.pointer(event, this.canvas)
    this.currentLine = { start: [x, y], end: [x, y] }
  }

  private draw (event: MouseEvent): void {
    if (!this.isDrawing) {
      return
    }
    const [x, y] = d3.pointer(event, this.canvas)
    this.currentLine.end = [x, y]
    this.updateCanvas()
  }

  private endDrawing (): void {
    this.isDrawing = false
    this.lines.push(this.currentLine)
  }

  private updateCanvas (): void {
    const img = new Image()
    img.src = '../assets/background.png'
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.drawImage(img, 0, 0)

    this.lines.forEach(line => {
      this.context.strokeStyle = 'red'
      this.context.lineWidth = 3
      this.context.beginPath()
      this.context.moveTo(line.start[0], line.start[1])
      this.context.lineTo(line.end[0], line.end[1])
      this.context.stroke()
    })
    if (this.isDrawing) {
      this.context.strokeStyle = 'red'
      this.context.lineWidth = 3
      this.context.beginPath()
      this.context.moveTo(this.currentLine.start[0], this.currentLine.start[1])
      this.context.lineTo(this.currentLine.end[0], this.currentLine.end[1])
      this.context.stroke()
    }
  }
}
