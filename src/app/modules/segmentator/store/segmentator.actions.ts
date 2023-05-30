import { createAction, props } from '@ngrx/store'
import { Tool } from '../models/Tool'
import { ImageData } from './segmentator.state'

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
    images: ImageData[]
  }>()
)

export const getImagesFailure = createAction(
  `[${segmentatorFeatureKey}] getImages Failure`,
  props<{ error: string }>()
)

export const selectImage = createAction(
  `[${segmentatorFeatureKey}] Select Image`,
  props<{
    selectedImage: string
  }>()
)

export const addPoint = createAction(
  `[${segmentatorFeatureKey}] Add Point`,
  props<{ image: ImageData; point: number[] }>()
)
