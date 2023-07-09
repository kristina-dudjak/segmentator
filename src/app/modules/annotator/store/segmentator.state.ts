import { Tool } from '../../annotator/models/Tool'
import { LineTool } from '../services/line-tool.service'

export interface SegmentatorState {
  tool: Tool
  images: ImageData[]
  selectedImage: ImageData //change to url
}

export interface ImageData {
  url: string
  shapes: Shape[] // an array of poly or rect shapes, each shape has array of points, each point has x and y
}

export interface Shape {
  shapeType: string
  points: number[][]
}

export const initialState: SegmentatorState = {
  tool: new LineTool(),
  images: [],
  selectedImage: undefined
}
