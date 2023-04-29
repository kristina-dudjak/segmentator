import { createAction, props } from '@ngrx/store'
import { Tool } from '../models/Tool'

export const segmentatorFeatureKey = 'segmentator'

export const toggleTool = createAction(
  `[${segmentatorFeatureKey}] Toggle`,
  props<{
    tool: Tool
  }>()
)

export const getImagesRequest = createAction(
  `[${segmentatorFeatureKey}] getImages Request`
)

export const getImagesSuccess = createAction(
  `[${segmentatorFeatureKey}] getImages Success`,
  props<{
    images: string[]
  }>()
)

export const getImagesFailure = createAction(
  `[${segmentatorFeatureKey}] getImages Failure`,
  props<{ error: string }>()
)
