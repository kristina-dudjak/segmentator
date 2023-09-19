import { createReducer, on } from '@ngrx/store'
import { initialState } from './segmentator.state'
import {
  addShape,
  getImagesBundleRequest,
  getImagesBundleSuccess,
  getImagesFailure,
  getImagesRequest,
  getImagesSuccess,
  getUserImagesFailure,
  getUserImagesRequest,
  getUserImagesSuccess,
  removeImage,
  removeShape,
  replaceShape,
  saveImageFailure,
  saveImageRequest,
  saveImageSuccess,
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
  on(getImagesBundleRequest, state => ({ ...state })),
  on(getImagesBundleSuccess, (state, { images }) => ({
    ...state,
    images: images
  })),
  on(getImagesFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(removeImage, (state, { image }) => {
    const updatedImages = state.images.filter(img => img.id !== image.id)
    return { ...state, images: updatedImages }
  }),
  on(getUserImagesRequest, state => ({ ...state })),
  on(getUserImagesSuccess, (state, { images }) => ({
    ...state,
    images: images
  })),
  on(getUserImagesFailure, (state, { error }) => ({
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
  on(removeShape, (state, { image, index }) => {
    const updatedImages = state.images.map(img => {
      if (img === image) {
        const updatedShapes = [
          ...img.shapes.slice(0, index),
          ...img.shapes.slice(index + 1)
        ]
        return {
          ...img,
          shapes: updatedShapes
        }
      }
      return img
    })
    return {
      ...state,
      images: updatedImages
    }
  }),
  on(replaceShape, (state, { image, shapeType, points }) => {
    const updatedImages = state.images.map(img => {
      if (img === image && img.shapes.length > 0) {
        const updatedShapes = [...img.shapes]
        updatedShapes[img.shapes.length - 1] = { shapeType, points }
        return { ...img, shapes: updatedShapes }
      } else {
        return img
      }
    })

    return { ...state, images: updatedImages }
  }),
  on(saveImageRequest, state => ({ ...state })),
  on(saveImageSuccess, state => ({
    ...state
  })),
  on(saveImageFailure, (state, { error }) => ({
    ...state,
    error: error
  }))
)
