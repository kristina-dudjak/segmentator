import { Injectable } from '@angular/core'
import * as d3 from 'd3'
import { Tool } from '../../annotator/models/Tool'
import { ImageData, SegmentatorState } from '../store/segmentator.state'
import { Store } from '@ngrx/store'
import { addShape } from '../store/segmentator.actions'

@Injectable({
  providedIn: 'root'
})
export class LineTool extends Tool {
  icon: string = 'timeline'

  override onMouseDown (
    event: MouseEvent,
    canvas: SVGElement,
    image: ImageData,
    store: Store<SegmentatorState>,
    points: number[][]
  ) {
    const rect = canvas.getBoundingClientRect()
    const scaleX = rect.width / canvas.clientWidth
    const scaleY = rect.height / canvas.clientHeight
    const [x, y] = d3.pointer(event)
    const point = [x * scaleX, y * scaleY]
    points.push(point)

    d3.select(canvas).selectAll(`.shape${image.shapes.length}`).remove()
    d3.select(canvas)
      .append('polyline')
      .attr('points', points.join(' '))
      .attr('class', `shape${image.shapes.length}`)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', '3')

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
        d3.select(canvas).selectAll(`.shape${image.shapes.length}`).remove()
        d3.select(canvas)
          .append('polyline')
          .attr('points', points.join(' '))
          .attr('class', `shape${image.shapes.length}`)
          .attr('fill', 'red')
        store.dispatch(addShape({ image, shapeType: 'line', points: points }))
      }
    }
  }

  override onMouseMove (
    event: MouseEvent,
    canvas: SVGElement,
    points: number[][]
  ) {
    const rect = canvas.getBoundingClientRect()
    const scaleX = rect.width / canvas.clientWidth
    const scaleY = rect.height / canvas.clientHeight
    const [x, y] = d3.pointer(event)
    const point = [x * scaleX, y * scaleY]
    const temporaryPoints = [...points, point]

    d3.select(canvas).select('.temporary-polyline').remove()
    if (points.length > 0) {
      d3.select(canvas)
        .append('polyline')
        .attr('class', 'temporary-polyline')
        .attr('points', temporaryPoints.join(' '))
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-width', '3')
    }
  }
}
