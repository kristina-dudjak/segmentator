import { User } from '../models/User'

export interface AuthState {
  user: User | null
  error: string | null
}

export const initialState: AuthState = {
  user: null,
  error: null
}
