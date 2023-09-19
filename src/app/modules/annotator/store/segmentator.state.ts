import { Tool } from '../../annotator/models/Tool'
import { LineTool } from '../services/line-tool.service'
import { ImageData } from '../models/ImageData'

export interface SegmentatorState {
  tool: Tool
  images: ImageData[]
  selectedImage: ImageData
}

export const initialState: SegmentatorState = {
  tool: new LineTool(),
  images: [],
  selectedImage: undefined
}
