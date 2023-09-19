import { Injectable } from '@angular/core'
import { Tool } from '../../annotator/models/Tool'
import * as d3 from 'd3'
import { SegmentatorState } from '../store/segmentator.state'
import { Store } from '@ngrx/store'
import { addShape } from '../store/segmentator.actions'
import { Point } from '../models/Point'
import { ImageData } from '../models/ImageData'
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
    points: Point[]
  ) {
    this.draw(event, canvas, image, store, points)
  }

  override onMouseUp (
    event: MouseEvent,
    canvas: SVGElement,
    image: ImageData,
    store: Store<SegmentatorState>,
    points: Point[]
  ) {
    this.draw(event, canvas, image, store, points)
    d3.select(canvas).select('.temporary-rect').remove()
  }

  override onMouseMove (event: MouseEvent, canvas: SVGElement, points: Point[]) {
    const rect = canvas.getBoundingClientRect()
    const scaleX = rect.width / canvas.clientWidth
    const scaleY = rect.height / canvas.clientHeight
    const [x, y] = d3.pointer(event)
    const point: Point = { x: x * scaleX, y: y * scaleY }
    const temporaryPoints = [...points, point]
    if (temporaryPoints.length >= 2) {
      let startX = temporaryPoints[0].x
      let startY = temporaryPoints[0].y
      let endX = temporaryPoints[1].x
      let endY = temporaryPoints[1].y

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
        .attr('fill', 'rgba(0, 0, 0, 0.5)')
    }
  }

  draw (
    event: MouseEvent,
    canvas: SVGElement,
    image: ImageData,
    store: Store<SegmentatorState>,
    points: Point[]
  ) {
    const rect = canvas.getBoundingClientRect()
    const scaleX = rect.width / canvas.clientWidth
    const scaleY = rect.height / canvas.clientHeight
    const [x, y] = d3.pointer(event)
    const point: Point = { x: x * scaleX, y: y * scaleY }
    points.push(point)
    if (points.length >= 2) {
      let startX = points[0].x
      let startY = points[0].y
      let endX = points[1].x
      let endY = points[1].y

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
        .attr('fill', 'rgba(0, 0, 0, 0.5)')
      store.dispatch(addShape({ image, shapeType: 'rect', points: points }))
    }
  }
}
