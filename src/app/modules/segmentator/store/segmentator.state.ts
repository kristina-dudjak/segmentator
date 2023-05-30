import { Tool } from '../models/Tool'
import { LineTool } from '../services/line-tool.service'

export interface SegmentatorState {
  tool: Tool
  images: ImageData[]
  selectedImage: string
}

export interface ImageData {
  url: string
  points: number[][]
}

export const initialState: SegmentatorState = {
  tool: new LineTool(),
  images: [],
  selectedImage: undefined
}
