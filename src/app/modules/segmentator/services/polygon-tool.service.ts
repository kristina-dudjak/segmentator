import { Injectable } from '@angular/core'
import { Tool } from '../models/Tool'
import { Store } from '@ngrx/store'
import { ImageData, SegmentatorState } from '../store/segmentator.state'
import * as d3 from 'd3'
import { addShape, replaceShape } from '../store/segmentator.actions'

@Injectable({
  providedIn: 'root'
})
export class PolygonTool extends Tool {
  icon: string = 'polygon'

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

    if (points.length >= 3) {
      d3.select(canvas).selectAll('polygon.poly').remove()
      if (
        image.shapes[image.shapes.length - 1]?.shapeType === 'poly' &&
        image.shapes[image.shapes.length - 1]?.points.some(
          existingPoint =>
            existingPoint[0] === points[0][0] &&
            existingPoint[1] === points[0][1]
        )
      ) {
        store.dispatch(replaceShape({ image, shapeType: 'poly', points }))
      } else {
        store.dispatch(
          addShape({
            image,
            shapeType: 'poly',
            points: points
          })
        )
      }
      d3.select(canvas)
        .append('polygon')
        .attr('points', points.join(' '))
        .attr('class', 'poly')
        .attr('fill', 'red')
        .attr('stroke', 'red')
        .attr('stroke-width', '3')
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

    d3.select(canvas).selectAll('.temporary-polygon').remove()

    if (temporaryPoints.length >= 3) {
      d3.select(canvas)
        .append('polygon')
        .attr('points', temporaryPoints.join(' '))
        .attr('class', 'temporary-polygon')
        .attr('fill', 'red')
        .attr('stroke', 'red')
        .attr('stroke-width', '3')
    } else if (temporaryPoints.length > 1) {
      d3.select(canvas)
        .append('polyline')
        .attr('points', temporaryPoints.join(' '))
        .attr('class', 'temporary-polygon')
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-width', '3')
    }
  }
}
