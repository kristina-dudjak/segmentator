import { createAction, props } from '@ngrx/store'
import { Tool } from '../../annotator/models/Tool'
import { User } from '../../auth/models/User'
import { Point } from '../models/Point'
import { ImageData } from '../models/ImageData'

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

export const getImagesBundleRequest = createAction(
  `[${segmentatorFeatureKey}] getImages bundle Request`
)

export const getImagesBundleSuccess = createAction(
  `[${segmentatorFeatureKey}] getImages bundle Success`,
  props<{
    images: ImageData[]
  }>()
)

export const getImagesBundleFailure = createAction(
  `[${segmentatorFeatureKey}] getImages bundle Failure`,
  props<{ error: string }>()
)

export const removeImage = createAction(
  `[${segmentatorFeatureKey}] Remove Image`,
  props<{ image: ImageData }>()
)

export const getUserImagesFailure = createAction(
  `[${segmentatorFeatureKey}] getUserImages Failure`,
  props<{ error: string }>()
)

export const getUserImagesRequest = createAction(
  `[${segmentatorFeatureKey}] getUserImages Request`
)

export const getUserImagesSuccess = createAction(
  `[${segmentatorFeatureKey}] getUserImages Success`,
  props<{
    images: ImageData[]
  }>()
)

export const selectImage = createAction(
  `[${segmentatorFeatureKey}] Select Image`,
  props<{
    selectedImage: ImageData
  }>()
)

export const addShape = createAction(
  `[${segmentatorFeatureKey}] Add Shape`,
  props<{ image: ImageData; shapeType: string; points: Point[] }>()
)

export const removeShape = createAction(
  `[${segmentatorFeatureKey}] Remove Shape`,
  props<{ image: ImageData; index: number }>()
)

export const replaceShape = createAction(
  `[${segmentatorFeatureKey}] Replace Shape`,
  props<{ image: ImageData; shapeType: string; points: Point[] }>()
)

export const saveImageRequest = createAction(
  `[${segmentatorFeatureKey}] saveImage Request`,
  props<{
    user: User
    image: ImageData
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
