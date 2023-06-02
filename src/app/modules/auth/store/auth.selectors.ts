import { createFeatureSelector, createSelector } from '@ngrx/store'
import { authFeatureKey } from './auth.actions'
import { AuthState } from './auth.state'

const authFeatureSelector = createFeatureSelector<AuthState>(authFeatureKey)

export const getUser = createSelector(
  authFeatureSelector,
  (state: AuthState) => state.user
)
