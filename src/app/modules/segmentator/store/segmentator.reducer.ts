import { createReducer, on } from '@ngrx/store'
import { initialState } from './segmentator.state'
import {
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
  }))
)
