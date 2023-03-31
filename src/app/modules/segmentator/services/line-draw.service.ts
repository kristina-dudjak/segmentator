import { Injectable } from '@angular/core'
import * as d3 from 'd3'

@Injectable({
  providedIn: 'root'
})
export class LineDrawService {
  private context!: CanvasRenderingContext2D
  private canvas!: HTMLCanvasElement
  private isDrawing = false
  private currentLine: any
  private lines: any[] = []
  constructor () {}

  public setContext (context: CanvasRenderingContext2D) {
    this.context = context
  }

  public setCanvas (canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')!
    this.canvas.width = 1000
    this.canvas.height = 500
    const img = new Image()
    img.src = '../assets/background.png'
    img.onload = () => {
      this.context.drawImage(img, 0, 0)
    }
  }

  public startDrawing (event: MouseEvent) {
    this.isDrawing = true
    const [x, y] = d3.pointer(event, this.canvas)
    this.currentLine = { start: [x, y], end: [x, y] }
    document.addEventListener('keydown', this.undoLine.bind(this, event))
    this.canvas.addEventListener('mousedown', this.undoLine.bind(this, event))
  }

  private undoLine (event: MouseEvent | KeyboardEvent) {
    if (
      this.isDrawing &&
      (event instanceof KeyboardEvent
        ? event.key === 'Backspace' || event.key === 'Delete'
        : event.button === 2)
    ) {
      this.isDrawing = false
      this.currentLine = { start: [0, 0], end: [0, 0] }
      this.updateCanvas()
    }
  }

  public draw (event: MouseEvent) {
    if (!this.isDrawing) {
      return
    }
    const [x, y] = d3.pointer(event, this.canvas)
    this.currentLine.end = [x, y]
    this.updateCanvas()
  }

  public endDrawing () {
    this.isDrawing = false
    if (this.currentLine.start[0] !== 0) {
      this.lines.push(this.currentLine)
    }
  }

  private updateCanvas = () => {
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
