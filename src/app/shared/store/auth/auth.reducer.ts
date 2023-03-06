import { Action, ActionReducer, createReducer, on } from '@ngrx/store'
import { User } from '../../models/User'
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

export interface AuthState {
  user: User
  loading: boolean
  error: string | null
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null
}

export const authReducer: ActionReducer<AuthState, Action> = createReducer(
  initialState,
  on(registerRequest, state => ({ ...state, loading: true })),
  on(registerSuccess, (state, { data: { user } }) => ({
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
  on(loginSuccess, (state, { data: { user } }) => ({
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
