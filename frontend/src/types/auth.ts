export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  phone: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken?: string
}

export interface RefreshTokenResponse {
  token: string
  refreshToken: string
}

export interface AuthContextType {
  user: User | null
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  refreshToken: () => Promise<void>
  isLoading: boolean
  isAuthenticated: boolean
}

import { User } from './user'
