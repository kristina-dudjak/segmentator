import { User } from '../models/User'

export interface AuthState {
  readonly user: User
  readonly error: string
}

export const initialState: AuthState = {
  user: undefined,
  error: undefined
}
