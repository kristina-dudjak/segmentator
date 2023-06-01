import { createReducer, on } from '@ngrx/store'
import { initialState } from './segmentator.state'
import {
  addShape,
  getImagesFailure,
  getImagesRequest,
  getImagesSuccess,
  removeShape,
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
  on(addShape, (state, { image, shapeType, points }) => {
    const updatedImages = state.images.map(img =>
      img === image
        ? { ...img, shapes: [...img.shapes, { shapeType, points }] }
        : img
    )
    return state.images === updatedImages
      ? state
      : { ...state, images: updatedImages }
  }),
  on(removeShape, (state, { image }) => {
    const updatedImages = state.images.map(img =>
      img === image ? { ...img, shapes: image.shapes.slice(0, -1) } : img
    )
    return { ...state, images: updatedImages }
  })
)
