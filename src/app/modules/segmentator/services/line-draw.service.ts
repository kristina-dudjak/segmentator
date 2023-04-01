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
    this.canvas.style.backgroundImage = '../assets/background.png'
    this.canvas.style.backgroundSize = 'cover'
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    const scaleX = this.canvas.width / this.canvas.offsetWidth
    const scaleY = this.canvas.height / this.canvas.offsetHeight

    this.lines.forEach(line => {
      this.context.strokeStyle = 'red'
      this.context.lineWidth = 1
      this.context.beginPath()
      this.context.moveTo(line.start[0] * scaleX, line.start[1] * scaleY)
      this.context.lineTo(line.end[0] * scaleX, line.end[1] * scaleY)
      this.context.stroke()
    })
    if (this.isDrawing) {
      this.context.strokeStyle = 'red'
      this.context.lineWidth = 1
      this.context.beginPath()
      this.context.moveTo(
        this.currentLine.start[0] * scaleX,
        this.currentLine.start[1] * scaleY
      )
      this.context.lineTo(
        this.currentLine.end[0] * scaleX,
        this.currentLine.end[1] * scaleY
      )
      this.context.stroke()
    }
  }
}
