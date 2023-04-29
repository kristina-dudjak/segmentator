import { Tool } from '../models/Tool'
import { LineTool } from '../services/line-tool.service'

export interface SegmentatorState {
  tool: Tool
  images: string[]
}

export const initialState: SegmentatorState = {
  tool: new LineTool(),
  images: []
}
