import { Injectable } from '@angular/core'
import { Tool } from '../models/Tool'
import * as d3 from 'd3'
import { ImageData, SegmentatorState } from '../store/segmentator.state'
import { Store } from '@ngrx/store'
import { addPoint } from '../store/segmentator.actions'
@Injectable({
  providedIn: 'root'
})
export class RectTool implements Tool {
  icon: string = 'gesture'

  undo (image: ImageData, store: Store<SegmentatorState>) {}

  update (canvas: HTMLCanvasElement, image: ImageData) {
    const context = canvas.getContext('2d')!
    if (image.points.length >= 2) {
      const width = image.points[1][0] - image.points[0][0]
      const height = image.points[1][1] - image.points[0][1]
      context.fillStyle = 'red'
      context.fillRect(image.points[0][0], image.points[0][1], width, height)
    }
  }

  draw (
    event: MouseEvent,
    canvas: HTMLCanvasElement,
    image: ImageData,
    store: Store<SegmentatorState>
  ) {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    const [x, y] = d3.pointer(event)
    const point = [x * scaleX, y * scaleY]

    if (event.type === 'mousedown' || event.type === 'mouseup') {
      store.dispatch(addPoint({ image, point }))
    }
  }
}
