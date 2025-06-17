import { User } from '@/types/user'

export const TOKEN_KEY = 'rideshare_token'

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export function setStoredToken(token: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeStoredToken(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(TOKEN_KEY)
}

export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Date.now() / 1000
    return payload.exp < currentTime
  } catch {
    return true
  }
}

export function getUserFromToken(token: string): Partial<User> | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return {
      id: payload.user_id,
      email: payload.email,
      name: payload.name
    }
  } catch {
    return null
  }
}
