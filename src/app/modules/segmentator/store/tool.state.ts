import { Tool } from '../models/Tool'
import { LineTool } from '../services/line-tool.service'

export interface ToolState {
  tool: Tool
}

export const initialState: ToolState = {
  tool: new LineTool()
}
