import { User } from './user'

export interface Trip {
  id: number
  driverId: number
  from: string
  to: string
  departureTime: string
  maxPassengers: number
  currentPassengers: number
  pricePerPerson: number
  description?: string
  status: 'active' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
  driver?: User
  passengers?: User[]
  userRole?: 'driver' | 'passenger' | 'none' 
}

export interface CreateTripData {
  from: string
  to: string
  departureTime: string
  maxPassengers: number
  pricePerPerson: number
  description?: string
}

export interface UpdateTripData {
  from?: string
  to?: string
  departureTime?: string
  maxPassengers?: number
  pricePerPerson?: number
  description?: string
}

export interface SearchTripsData {
  from?: string
  to?: string
  departureDate?: string
  maxPrice?: number
  limit?: number
  offset?: number
}

export interface TripMatch {
  id: number
  tripId: number
  passengerId: number
  status: 'pending' | 'confirmed' | 'cancelled'
  joinedAt: string
  trip?: Trip
  passenger?: User
}

export interface TripStats {
  totalTrips: number
  activeTrips: number
  completedTrips: number
  cancelledTrips: number
  totalEarnings: number
  averageRating: number
}

export interface TripFilters {
  status?: string[]
  dateRange?: {
    start: string
    end: string
  }
  priceRange?: {
    min: number
    max: number
  }
  locations?: string[]
}

export interface TripSortOptions {
  field: 'departureTime' | 'pricePerPerson' | 'createdAt'
  direction: 'asc' | 'desc'
}

export interface PaginatedTripsResponse {
  trips: Trip[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}
