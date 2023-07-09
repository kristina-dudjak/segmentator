import { Store } from '@ngrx/store'
import {
  ImageData,
  SegmentatorState
} from '../../annotator/store/segmentator.state'
import * as d3 from 'd3'
export abstract class Tool {
  abstract icon: string
  update (canvas: SVGElement, image: ImageData) {
    canvas.innerHTML = ''
    for (let i = 0; i < image.shapes.length; i++) {
      if (image.shapes[i].shapeType === 'poly') {
        d3.select(canvas)
          .append('polygon')
          .attr('points', image.shapes[i].points.join(' '))
          .attr('fill', 'red')
          .attr('class', `shape${i}`)
          .attr('stroke', 'red')
          .attr('stroke-width', '3')
      } else if (image.shapes[i].shapeType === 'line') {
        d3.select(canvas)
          .append('polyline')
          .attr('points', image.shapes[i].points.join(' '))
          .attr('fill', 'red')
          .attr('class', `shape${i}`)
          .attr('stroke', 'red')
          .attr('stroke-width', '3')
      } else if (image.shapes[i].shapeType === 'rect') {
        let startX = image.shapes[i].points[0][0]
        let startY = image.shapes[i].points[0][1]
        let endX = image.shapes[i].points[1][0]
        let endY = image.shapes[i].points[1][1]

        if (startX > endX) {
          ;[startX, endX] = [endX, startX]
        }
        if (startY > endY) {
          ;[startY, endY] = [endY, startY]
        }

        const width = endX - startX
        const height = endY - startY
        d3.select(canvas)
          .append('rect')
          .attr('x', startX)
          .attr('y', startY)
          .attr('width', width)
          .attr('height', height)
          .attr('fill', 'red')
          .attr('class', `shape${i}`)
      }
    }
  }
  onMouseDown?(
    event: MouseEvent,
    canvas: SVGElement,
    image: ImageData,
    store: Store<SegmentatorState>,
    points: number[][]
  ): void
  onMouseMove?(event: MouseEvent, canvas: SVGElement, points: number[][]): void
  onMouseUp?(
    event: MouseEvent,
    canvas: SVGElement,
    image: ImageData,
    store: Store<SegmentatorState>,
    points: number[][]
  ): void
}
