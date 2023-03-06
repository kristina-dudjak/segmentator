import { createAction, props } from '@ngrx/store'
import { User } from '../../models/User'

export const loginRequest = createAction('[Auth] Login Request')

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{
    data: { user: User; credentials: { email: string; password: string } }
  }>()
)

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
)

export const registerRequest = createAction(
  '[Auth] Register Request',
  props<{
    data: { credentials: { email: string; password: string } }
  }>()
)

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{
    data: { user: User }
  }>()
)

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
)

export const signOutRequest = createAction('[Auth] SignOut')

export const signOutSuccess = createAction('[Auth] SignOut Success')

export const signOutFailure = createAction(
  '[Auth] SignOut Failure',
  props<{ error: string }>()
)
