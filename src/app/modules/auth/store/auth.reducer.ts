import { createReducer, on } from '@ngrx/store'
import {
  getUserFailure,
  getUserRequest,
  getUserSuccess,
  googleLoginFailure,
  googleLoginRequest,
  googleLoginSuccess,
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
  on(googleLoginRequest, state => ({
    ...state
  })),
  on(googleLoginSuccess, (state, { user }) => ({
    ...state,
    user: user
  })),
  on(googleLoginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),
  on(getUserRequest, state => ({ ...state })),
  on(getUserSuccess, (state, { user }) => ({
    ...state,
    user: user
  })),
  on(getUserFailure, state => ({ ...state })),
  on(registerRequest, state => ({ ...state })),
  on(registerSuccess, (state, { user }) => ({
    ...state,
    user: user
  })),
  on(registerFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(loginRequest, state => ({
    ...state
  })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user: user
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(signOutRequest, state => ({
    ...state
  })),
  on(signOutSuccess, state => ({
    ...state,
    user: null
  })),
  on(signOutFailure, (state, { error }) => ({
    ...state,
    error: error
  }))
)
