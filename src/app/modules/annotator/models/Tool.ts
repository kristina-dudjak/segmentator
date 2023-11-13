import { Store } from '@ngrx/store'
import * as d3 from 'd3'
import { ImageData } from './ImageData'
import { SegmentatorState } from '../store/segmentator.state'
import { Point } from './Point'
export abstract class Tool {
  abstract icon: string
  update(canvas: SVGElement, image: ImageData) {
    canvas.innerHTML = ''
    image.shapes.forEach((shape, i) => {
      const pointsString = shape.points
        .map(point => `${point.x},${point.y}`)
        .join(' ')

      switch (shape.shapeType) {
        case 'poly':
        case 'line':
          d3.select(canvas)
            .append(shape.shapeType === 'poly' ? 'polygon' : 'polyline')
            .attr('points', pointsString)
            .attr('fill', 'rgba(0, 0, 0, 0.5)')
            .attr('class', `shape${i}`)
            .attr('stroke', 'rgba(0, 0, 0, 0.5)')
            .attr('stroke-width', '3')
          break

        case 'rect':
          const { x: startX, y: startY } = shape.points[0]
          const { x: endX, y: endY } = shape.points[1]
          const [x, y, width, height] = [
            startX,
            startY,
            endX - startX,
            endY - startY
          ]

          d3.select(canvas)
            .append('rect')
            .attr('x', x)
            .attr('y', y)
            .attr('width', width)
            .attr('height', height)
            .attr('fill', 'rgba(0, 0, 0, 0.5)')
            .attr('class', `shape${i}`)
          break
      }
    })
  }

  onMouseDown?(
    event: MouseEvent,
    canvas: SVGElement,
    image: ImageData,
    store: Store<SegmentatorState>,
    points: Point[]
  ): void
  onMouseMove?(event: MouseEvent, canvas: SVGElement, points: Point[]): void
  onMouseUp?(
    event: MouseEvent,
    canvas: SVGElement,
    image: ImageData,
    store: Store<SegmentatorState>,
    points: Point[]
  ): void
}
