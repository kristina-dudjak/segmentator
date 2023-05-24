import { Tool } from '../models/Tool'
import { LineTool } from '../services/line-tool.service'

export interface SegmentatorState {
  tool: Tool
  images: string[]
  selectedImage: string
}

export const initialState: SegmentatorState = {
  tool: new LineTool(),
  images: [],
  selectedImage: undefined
}
