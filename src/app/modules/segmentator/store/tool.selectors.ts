import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ToolState } from './tool.state'
import { toolFeatureKey } from './tool.actions'

const toolFeatureSelector = createFeatureSelector<ToolState>(toolFeatureKey)

export const getTool = createSelector(
  toolFeatureSelector,
  (state: ToolState) => state.tool
)
