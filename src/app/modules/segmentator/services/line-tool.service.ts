import { Injectable } from '@angular/core'
import * as d3 from 'd3'
import { Tool } from '../models/Tool'
import { ImageData, SegmentatorState } from '../store/segmentator.state'
import { Store } from '@ngrx/store'
import { addPoint } from '../store/segmentator.actions'

@Injectable({
  providedIn: 'root'
})
export class LineTool implements Tool {
  icon: string = 'minimize'

  update (canvas: HTMLCanvasElement, image: ImageData) {
    const context = canvas.getContext('2d')!

    context.clearRect(0, 0, canvas.width, canvas.height)

    context.fillStyle = 'red'
    context.lineWidth = 1
    context.strokeStyle = 'red'

    if (image.points.length > 0) {
      context.beginPath()
      context.moveTo(image.points[0][0], image.points[0][1])
      for (let i = 1; i < image.points.length; i++) {
        context.lineTo(image.points[i][0], image.points[i][1])
      }
      context.stroke()

      const limit = 10

      if (image.points.length > 2) {
        let dx = image.points[0][0] - image.points[image.points.length - 1][0]
        let dy = image.points[0][1] - image.points[image.points.length - 1][1]
        if (dx < 0) {
          dx *= -1
        }
        if (dy < 0) {
          dy *= -1
        }
        if (dx < limit && dy < limit) {
          console.log('CLOSE IT')
          context.closePath()
          context.fill()

          var img = new Image()
          img.src = canvas.toDataURL()
        }
      }
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
    store.dispatch(addPoint({ image: image, point }))
  }
}
