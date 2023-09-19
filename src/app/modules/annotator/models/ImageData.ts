import { Shape } from './Shape'

export interface ImageData {
  id: string
  url: string
  shapes: Shape[] // an array of poly or rect shapes, each shape has array of points, each point has x and y
}
