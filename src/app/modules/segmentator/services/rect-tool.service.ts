import { Injectable } from '@angular/core'
import { Tool } from '../models/Tool'
import * as d3 from 'd3'
import { ImageData, SegmentatorState } from '../store/segmentator.state'
import { Store } from '@ngrx/store'
@Injectable({
  providedIn: 'root'
})
export class RectTool implements Tool {
  undo (image: ImageData, store: Store<SegmentatorState>) {}
  update: (canvas: HTMLCanvasElement, image: ImageData) => void
  icon: string = 'gesture'

  draw (
    event: MouseEvent,
    canvas: HTMLCanvasElement,
    image: ImageData,
    store: Store<SegmentatorState>,
    isDrawing: boolean
  ) {
    const context = canvas.getContext('2d')!
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    const [x, y] = d3.pointer(event)
    const point = [x * scaleX, y * scaleY]
    console.log(point)
    context.fillStyle = 'red'
    context.lineWidth = 1
    context.strokeStyle = 'red'
    context.beginPath()
    context.stroke()

    const mouseMove = (event: MouseEvent) => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      const [x, y] = d3.pointer(event)
      const endPoint = [x * scaleX, y * scaleY]
      const width = endPoint[0] - point[0]
      const height = endPoint[1] - point[1]

      context.beginPath()
      context.fillStyle = 'red'
      context.fillRect(point[0], point[1], width, height)
      context.stroke()
    }

    const finish = (event: MouseEvent) => {
      canvas.removeEventListener('mousemove', mouseMove)
      canvas.removeEventListener('mousedown', finish)
    }
    canvas.addEventListener('mousemove', mouseMove)
    canvas.addEventListener('mousedown', finish)
  }
}
