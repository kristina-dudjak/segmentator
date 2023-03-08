import { createReducer, on } from '@ngrx/store'
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  registerFailure,
  registerRequest,
  registerSuccess,
  signOutFailure,
  signOutRequest,
  signOutSuccess
} from './auth.actions'
import { initialState } from './auth.state'

export const authReducer = createReducer(
  initialState,
  on(registerRequest, state => ({ ...state, loading: true })),
  on(registerSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    user: user
  })),
  on(registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),
  on(loginRequest, state => ({
    ...state,
    loading: true
  })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    user: user
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),
  on(signOutRequest, state => ({
    ...state,
    loading: true
  })),
  on(signOutSuccess, state => ({
    ...state,
    loading: false
  })),
  on(signOutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
)
