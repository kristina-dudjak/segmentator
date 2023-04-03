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
  private scaleX: number
  private scaleY: number
  constructor () {}

  public setContext (context: CanvasRenderingContext2D) {
    this.context = context
  }

  public setCanvas (canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')!
  }

  public startDrawing (event: MouseEvent) {
    if (event.button !== 0) {
      return
    }
    const [x, y] = d3.pointer(event, this.canvas)
    if (this.isDrawing) {
      this.currentLine.end = [x, y]
      this.lines.push(this.currentLine)
    }
    this.isDrawing = true
    this.currentLine = { start: [x, y], end: [x, y] }
    this.updateCanvas()
  }

  public undoLine (event: MouseEvent | KeyboardEvent) {
    if (
      event instanceof KeyboardEvent
        ? event.key === 'Backspace' || event.key === 'Delete'
        : event.button === 2
    ) {
      if (this.lines.length === 0) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.isDrawing = false
      } else {
        this.currentLine = this.lines.pop()
      }
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
    if (event.buttons === 1) {
      this.lines.push(this.currentLine)
      this.currentLine = { start: [x, y], end: [x, y] }
    }
  }

  public stopDrawing () {
    if (this.lines.length > 0) {
      this.currentLine.end = this.lines[this.lines.length - 1]
      this.updateCanvas()
    }
    this.isDrawing = false
  }

  private updateCanvas = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    if (!this.scaleX || !this.scaleY) {
      this.scaleX = this.canvas.width / this.canvas.offsetWidth
      this.scaleY = this.canvas.height / this.canvas.offsetHeight
    }

    this.lines.forEach(line => {
      this.context.strokeStyle = 'red'
      this.context.lineWidth = 1
      this.context.beginPath()
      this.context.moveTo(
        line.start[0] * this.scaleX,
        line.start[1] * this.scaleY
      )
      this.context.lineTo(line.end[0] * this.scaleX, line.end[1] * this.scaleY)
      this.context.stroke()
    })
    if (this.isDrawing) {
      this.context.strokeStyle = 'red'
      this.context.lineWidth = 1
      this.context.beginPath()
      this.context.moveTo(
        this.currentLine.start[0] * this.scaleX,
        this.currentLine.start[1] * this.scaleY
      )
      this.context.lineTo(
        this.currentLine.end[0] * this.scaleX,
        this.currentLine.end[1] * this.scaleY
      )
      this.context.stroke()
    }
  }
}
