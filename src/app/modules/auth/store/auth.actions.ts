import { createAction, props } from '@ngrx/store'
import { User } from '../../../shared/models/User'

export const authFeatureKey = 'Auth'

export const loginRequest = createAction(
  `[${authFeatureKey}] Login Request`,
  props<{
    credentials: { email: string; password: string }
  }>()
)

export const loginSuccess = createAction(
  `[${authFeatureKey}] Login Success`,
  props<{
    user: User
  }>()
)

export const loginFailure = createAction(
  `[${authFeatureKey}] Login Failure`,
  props<{ error: string }>()
)

export const registerRequest = createAction(
  `[${authFeatureKey}] Register Request`,
  props<{
    credentials: { email: string; password: string }
  }>()
)

export const registerSuccess = createAction(
  `[${authFeatureKey}] Register Success`,
  props<{
    user: User
  }>()
)

export const registerFailure = createAction(
  `[${authFeatureKey}] Register Failure`,
  props<{ error: string }>()
)

export const signOutRequest = createAction(
  `[${authFeatureKey}] SignOut Request`
)

export const signOutSuccess = createAction(
  `[${authFeatureKey}] SignOut Success`
)

export const signOutFailure = createAction(
  `[${authFeatureKey}] SignOut Failure`,
  props<{ error: string }>()
)
