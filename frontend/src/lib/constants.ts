export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    REFRESH: '/auth/refresh'
  },
  TRIPS: {
    LIST: '/trips',
    CREATE: '/trips',
    GET: (id: number) => `/trips/${id}`,
    UPDATE: (id: number) => `/trips/${id}`,
    DELETE: (id: number) => `/trips/${id}`,
    JOIN: (id: number) => `/trips/${id}/join`,
    SEARCH: '/trips/search'
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile'
  }
} as const

export const TRIP_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator'
} as const

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100
} as const

export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  MIN_PRICE: 0,
  MAX_PRICE: 1000,
  MIN_PASSENGERS: 1,
  MAX_PASSENGERS: 8
} as const

export const MESSAGES = {
  SUCCESS: {
    TRIP_CREATED: 'Trip created successfully!',
    TRIP_UPDATED: 'Trip updated successfully!',
    TRIP_DELETED: 'Trip deleted successfully!',
    PROFILE_UPDATED: 'Profile updated successfully!',
    TRIP_JOINED: 'Successfully joined the trip!'
  },
  ERROR: {
    GENERIC: 'Something went wrong. Please try again.',
    NETWORK: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    TRIP_NOT_FOUND: 'Trip not found.',
    TRIP_FULL: 'This trip is already full.',
    INVALID_CREDENTIALS: 'Invalid email or password.'
  }
} as const
