import { createAction, props } from '@ngrx/store'
import { User } from '../../../shared/models/User'

export const authFeatureKey = 'Auth'

export const loginRequest = createAction(`[${authFeatureKey}] Login Request`)

export const loginSuccess = createAction(
  `[${authFeatureKey}] Login Success`,
  props<{
    data: { user: User; credentials: { email: string; password: string } }
  }>()
)

export const loginFailure = createAction(
  `[${authFeatureKey}] Login Failure`,
  props<{ error: string }>()
)

export const registerRequest = createAction(
  `[${authFeatureKey}] Register Request`,
  props<{
    data: { credentials: { email: string; password: string } }
  }>()
)

export const registerSuccess = createAction(
  `[${authFeatureKey}] Register Success`,
  props<{
    data: { user: User }
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
