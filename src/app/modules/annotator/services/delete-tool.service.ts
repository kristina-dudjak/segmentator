import { Injectable } from '@angular/core'
import { Tool } from '../../annotator/models/Tool'
import { Store } from '@ngrx/store'
import { SegmentatorState } from '../store/segmentator.state'
import * as d3 from 'd3'
import { removeShape } from '../store/segmentator.actions'
import { Point } from '../models/Point'
import { ImageData } from '../models/ImageData'

@Injectable({
  providedIn: 'root'
})
export class DeleteTool extends Tool {
  icon: string = 'delete'

  override onMouseDown (
    event: MouseEvent,
    canvas: SVGElement,
    image: ImageData,
    store: Store<SegmentatorState>,
    points: Point[]
  ) {
    var clickedElement = event.target
    if (clickedElement instanceof SVGElement) {
      var elementClass = clickedElement.getAttribute('class')
      d3.select(canvas)
        .selectAll(`${clickedElement.tagName}.${elementClass}`)
        .remove()
      //delete from db
      elementClass = elementClass.replace('shape', '')
      store.dispatch(removeShape({ image, index: parseInt(elementClass) }))
    }
  }
}
