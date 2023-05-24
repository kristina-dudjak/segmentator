import { createFeatureSelector, createSelector } from '@ngrx/store'
import { SegmentatorState } from './segmentator.state'
import { segmentatorFeatureKey } from './segmentator.actions'

const segmentatorFeatureSelector = createFeatureSelector<SegmentatorState>(
  segmentatorFeatureKey
)

export const getTool = createSelector(
  segmentatorFeatureSelector,
  (state: SegmentatorState) => state.tool
)

export const getImages = createSelector(
  segmentatorFeatureSelector,
  (state: SegmentatorState) => state.images
)

export const getImage = createSelector(
  segmentatorFeatureSelector,
  (state: SegmentatorState) => state.selectedImage
)
