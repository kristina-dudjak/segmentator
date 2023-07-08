import { Injectable } from '@angular/core'
import { Tool } from '../models/Tool'
import { Store } from '@ngrx/store'
import { ImageData, SegmentatorState } from '../store/segmentator.state'
import * as d3 from 'd3'
import { removeShape } from '../store/segmentator.actions'

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
    points: number[][]
  ) {
    var clickedElement = event.target
    if (clickedElement instanceof SVGElement) {
      var elementClass = clickedElement.getAttribute('class')
      d3.select(canvas)
        .selectAll(`${clickedElement.tagName}.${elementClass}`)
        .remove()
      //stvarno obrisat iz baze
      elementClass = elementClass.replace('shape', '')
      store.dispatch(removeShape({ image, index: parseInt(elementClass) }))
    }
  }
}
