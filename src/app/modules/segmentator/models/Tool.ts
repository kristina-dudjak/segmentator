import { Store } from '@ngrx/store'
import { ImageData, SegmentatorState } from '../store/segmentator.state'

export interface Tool {
  icon: string
  update: (canvas: HTMLCanvasElement, image: ImageData) => void
  draw: (
    event: MouseEvent,
    canvas: HTMLCanvasElement,
    image: ImageData,
    store: Store<SegmentatorState>,
    points: number[][]
  ) => void
  undo: (image: ImageData, store: Store<SegmentatorState>) => void
}
