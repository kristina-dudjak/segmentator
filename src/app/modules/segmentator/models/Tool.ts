import { Store } from '@ngrx/store'
import { ImageData, SegmentatorState } from '../store/segmentator.state'

export interface Tool {
  icon: string
  update: (canvas: HTMLCanvasElement, image: ImageData) => void
  draw: (
    event: MouseEvent,
    canvas: HTMLCanvasElement,
    image: ImageData,
    state: Store<SegmentatorState>
  ) => void
}
