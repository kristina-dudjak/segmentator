import { createAction, props } from '@ngrx/store'
import { Tool } from '../../annotator/models/Tool'
import { ImageData } from './segmentator.state'
import { User } from '../../auth/models/User'

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
    selectedImage: ImageData
  }>()
)

export const addShape = createAction(
  `[${segmentatorFeatureKey}] Add Shape`,
  props<{ image: ImageData; shapeType: string; points: number[][] }>()
)

export const removeShape = createAction(
  `[${segmentatorFeatureKey}] Remove Shape`,
  props<{ image: ImageData; index: number }>()
)

export const replaceShape = createAction(
  `[${segmentatorFeatureKey}] Replace Shape`,
  props<{ image: ImageData; shapeType: string; points: number[][] }>()
)

export const saveImageRequest = createAction(
  `[${segmentatorFeatureKey}] saveImage Request`,
  props<{
    user: User
    original: string
    marked: string
  }>()
)

export const saveImageSuccess = createAction(
  `[${segmentatorFeatureKey}] saveImage Success`
)

export const saveImageFailure = createAction(
  `[${segmentatorFeatureKey}] saveImage Failure`,
  props<{ error: string }>()
)
