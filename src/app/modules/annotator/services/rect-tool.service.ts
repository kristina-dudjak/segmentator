import { Injectable } from '@angular/core'
import { Tool } from '../../annotator/models/Tool'
import * as d3 from 'd3'
import { ImageData, SegmentatorState } from '../store/segmentator.state'
import { Store } from '@ngrx/store'
import { addShape } from '../store/segmentator.actions'
@Injectable({
  providedIn: 'root'
})
export class RectTool extends Tool {
  icon: string = 'crop_16_9'

  override onMouseDown (
    event: MouseEvent,
    canvas: SVGElement,
    image: ImageData,
    store: Store<SegmentatorState>,
    points: number[][]
  ) {
    this.draw(event, canvas, image, store, points)
  }

  override onMouseUp (
    event: MouseEvent,
    canvas: SVGElement,
    image: ImageData,
    store: Store<SegmentatorState>,
    points: number[][]
  ) {
    this.draw(event, canvas, image, store, points)
    d3.select(canvas).select('.temporary-rect').remove()
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
    if (temporaryPoints.length >= 2) {
      let startX = temporaryPoints[0][0]
      let startY = temporaryPoints[0][1]
      let endX = temporaryPoints[1][0]
      let endY = temporaryPoints[1][1]

      if (startX > endX) {
        ;[startX, endX] = [endX, startX]
      }
      if (startY > endY) {
        ;[startY, endY] = [endY, startY]
      }

      const width = endX - startX
      const height = endY - startY

      d3.select(canvas).select('.temporary-rect').remove()
      d3.select(canvas)
        .append('rect')
        .attr('x', startX)
        .attr('y', startY)
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'temporary-rect')
        .attr('fill', 'red')
    }
  }

  draw (
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
    if (points.length >= 2) {
      let startX = points[0][0]
      let startY = points[0][1]
      let endX = points[1][0]
      let endY = points[1][1]

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
        .attr('class', `shape${image.shapes.length}`)
        .attr('fill', 'red')
      store.dispatch(addShape({ image, shapeType: 'rect', points: points }))
    }
  }
}
