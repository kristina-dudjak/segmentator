import { Injectable } from '@angular/core'
import { Tool } from '../models/Tool'
import * as d3 from 'd3'
import { ImageData, SegmentatorState } from '../store/segmentator.state'
import { Store } from '@ngrx/store'
import { addShape, removeShape } from '../store/segmentator.actions'
@Injectable({
  providedIn: 'root'
})
export class RectTool implements Tool {
  icon: string = 'gesture'

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

    if (event.type === 'mousedown' || event.type === 'mouseup') {
      points.push(point)
      const context = canvas.getContext('2d')!
      if (points.length >= 2) {
        const width = points[1][0] - points[0][0]
        const height = points[1][1] - points[0][1]
        context.fillStyle = 'rgba(255, 0, 0, 0.4)'
        context.fillRect(points[0][0], points[0][1], width, height)
        store.dispatch(addShape({ image, shapeType: 'rect', points: points }))
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
  }
}
