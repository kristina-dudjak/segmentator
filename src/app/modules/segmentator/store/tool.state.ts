import { Tool } from '../models/Tool'

export interface ToolState {
  tool: Tool
}

export const initialState: ToolState = {
  tool: null
}
