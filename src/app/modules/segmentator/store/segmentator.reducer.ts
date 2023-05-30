import { createReducer, on } from '@ngrx/store'
import { initialState } from './segmentator.state'
import {
  addPoint,
  getImagesFailure,
  getImagesRequest,
  getImagesSuccess,
  selectImage,
  toggleTool
} from './segmentator.actions'

export const segmentatorReducer = createReducer(
  initialState,
  on(toggleTool, (state, { tool }) => ({
    ...state,
    tool
  })),
  on(getImagesRequest, state => ({ ...state })),
  on(getImagesSuccess, (state, { images }) => ({
    ...state,
    images: images
  })),
  on(getImagesFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(selectImage, (state, { selectedImage }) => ({
    ...state,
    selectedImage
  })),
  on(addPoint, (state, { image, point }) => {
    const updatedImages = state.images.map(img =>
      img === image ? { ...img, points: [...img.points, point] } : img
    )
    return state.images === updatedImages
      ? state
      : { ...state, images: updatedImages }
  })
)
