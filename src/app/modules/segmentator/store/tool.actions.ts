import { createAction, props } from '@ngrx/store'
import { Tool } from '../models/Tool'

export const toolFeatureKey = 'Tool'

export const toggleToolRequest = createAction(
  `[${toolFeatureKey}] Toggle Request`,
  props<{
    tool: Tool
  }>()
)

export const toggleToolSuccess = createAction(
  `[${toolFeatureKey}] Toggle Success`,
  props<{
    tool: Tool
  }>()
)

export const toggleToolFailure = createAction(
  `[${toolFeatureKey}] Toggle Failure`
)
