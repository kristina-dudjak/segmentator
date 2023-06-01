import { Injectable } from '@angular/core'
import * as d3 from 'd3'
import { Tool } from '../models/Tool'
import { ImageData, SegmentatorState } from '../store/segmentator.state'
import { Store } from '@ngrx/store'
import { addShape, removeShape } from '../store/segmentator.actions'

@Injectable({
  providedIn: 'root'
})
export class LineTool implements Tool {
  icon: string = 'minimize'

  update (canvas: HTMLCanvasElement, image: ImageData) {
    const context = canvas.getContext('2d')!
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = 'rgba(255, 0, 0, 0.4)'
    context.lineWidth = 1
    context.strokeStyle = 'rgba(255, 0, 0, 0.4)'
    for (let i = 0; i < image.shapes.length; i++) {
      if (image.shapes[i].shapeType === 'line') {
        context.beginPath()
        context.moveTo(
          image.shapes[i].points[0][0],
          image.shapes[i].points[0][1]
        )
        for (let j = 0; j < image.shapes[i].points.length; j++) {
          context.lineTo(
            image.shapes[i].points[j][0],
            image.shapes[i].points[j][1]
          )
        }
        context.stroke()
        context.closePath()
        context.fill()
      } else if (image.shapes[i].shapeType === 'rect') {
        if (image.shapes[i].points.length >= 2) {
          const width =
            image.shapes[i].points[1][0] - image.shapes[i].points[0][0]
          const height =
            image.shapes[i].points[1][1] - image.shapes[i].points[0][1]
          context.fillStyle = 'rgba(255, 0, 0, 0.4)'
          context.fillRect(
            image.shapes[i].points[0][0],
            image.shapes[i].points[0][1],
            width,
            height
          )
        }
      }
    }
  }

  draw (
    event: MouseEvent,
    canvas: HTMLCanvasElement,
    image: ImageData,
    store: Store<SegmentatorState>,
    points: number[][]
  ) {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const [x, y] = d3.pointer(event)
    const point = [x * scaleX, y * scaleY]
    points.push(point)
    const context = canvas.getContext('2d')!
    context.fillStyle = 'rgba(255, 0, 0, 0.4)'
    context.lineWidth = 1
    context.strokeStyle = 'rgba(255, 0, 0, 0.4)'
    if (points.length > 0) {
      context.beginPath()
      context.moveTo(points[0][0], points[0][1])
      for (let i = 1; i < points.length; i++) {
        context.lineTo(points[i][0], points[i][1])
      }
      context.stroke()
      const limit = 10
      if (points.length > 2) {
        let dx = points[0][0] - points[points.length - 1][0]
        let dy = points[0][1] - points[points.length - 1][1]
        if (dx < 0) {
          dx *= -1
        }
        if (dy < 0) {
          dy *= -1
        }
        if (dx < limit && dy < limit) {
          context.closePath()
          context.fill()
          store.dispatch(addShape({ image, shapeType: 'line', points: points }))
          var img = new Image()
          img.src = canvas.toDataURL()
        }
      }
    }
  }

  undo (
    canvas: HTMLCanvasElement,
    image: ImageData,
    store: Store<SegmentatorState>,
    points: number[][]
  ) {
    points.pop()
    if (points.length === 0) {
      store.dispatch(removeShape({ image }))
      return
    }
    const context = canvas.getContext('2d')!
    context.clearRect(0, 0, canvas.width, canvas.height)
    this.update(canvas, image)
    context.fillStyle = 'rgba(255, 0, 0, 0.4)'
    context.lineWidth = 1
    context.strokeStyle = 'rgba(255, 0, 0, 0.4)'
    context.beginPath()
    context.moveTo(points[0][0], points[0][1])
    for (let i = 1; i < points.length; i++) {
      context.lineTo(points[i][0], points[i][1])
    }
    context.stroke()
  }
}
