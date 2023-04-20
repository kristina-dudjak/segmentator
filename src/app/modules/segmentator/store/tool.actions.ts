import { createAction, props } from '@ngrx/store'
import { Tool } from '../models/Tool'

export const toolFeatureKey = 'tool'

export const toggleTool = createAction(
  `[${toolFeatureKey}] Toggle`,
  props<{
    tool: Tool
  }>()
)
