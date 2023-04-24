import { Injectable } from '@angular/core'
import * as d3 from 'd3'
import { Tool } from '../models/Tool'

@Injectable({
  providedIn: 'root'
})
export class LineTool implements Tool {
  icon: string = 'minimize'

  draw (event: MouseEvent, canvas: HTMLCanvasElement, points: number[][]) {
    const context = canvas.getContext('2d')!
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    const [x, y] = d3.pointer(event)
    const point = [x * scaleX, y * scaleY]

    points.push(point)
    context.fillStyle = 'red'
    context.lineWidth = 1
    context.strokeStyle = 'red'
    context.beginPath()
    context.moveTo(points[0][0], points[0][1])
    for (let i = 1; i < points.length; i++) {
      context.lineTo(points[i][0], points[i][1])
    }
    context.stroke()

    const limit = 10

    if (points.length > 2) {
      let dx = points[0][0] - point[0]
      let dy = points[0][1] - point[1]
      if (dx < 0) {
        dx *= -1
      }
      if (dy < 0) {
        dy *= -1
      }
      if (dx < limit && dy < limit) {
        context.closePath()
        context.fill()

        console.log(points)
        var img = new Image()
        img.src = canvas.toDataURL()
        console.log(img.src)
      }
    }
  }
}
