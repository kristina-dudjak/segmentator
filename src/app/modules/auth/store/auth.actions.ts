import { createAction, props } from '@ngrx/store'
import { User } from '../models/User'

export const authFeatureKey = 'Auth'

export const getUserRequest = createAction(
  `[${authFeatureKey}] Get User Request`
)

export const getUserSuccess = createAction(
  `[${authFeatureKey}] Get User Success`,
  props<{
    user: User
  }>()
)

export const getUserFailure = createAction(
  `[${authFeatureKey}] Get User Failure`
)

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

export const googleLoginRequest = createAction(
  `[${authFeatureKey}] Google Login Request`
)

export const googleLoginSuccess = createAction(
  `[${authFeatureKey}] Google Login Success`,
  props<{
    user: User
  }>()
)

export const googleLoginFailure = createAction(
  `[${authFeatureKey}] Google Login Failure`,
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
