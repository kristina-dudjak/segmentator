import { createReducer, on } from '@ngrx/store'
import { initialState } from './tool.state'
import { toggleTool } from './tool.actions'

export const toolReducer = createReducer(
  initialState,
  on(toggleTool, (state, { tool }) => ({
    ...state,
    tool
  }))
)
