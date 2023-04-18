import { createReducer, on } from '@ngrx/store'
import { initialState } from './tool.state'
import {
  toggleToolFailure,
  toggleToolRequest,
  toggleToolSuccess
} from './tool.actions'

export const toolReducer = createReducer(
  initialState,
  on(toggleToolRequest, state => ({ ...state })),
  on(toggleToolSuccess, (state, { tool }) => ({
    ...state,
    tool: tool
  }))
)
