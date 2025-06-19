'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { getTrips } from '@/lib/api'
import { Trip } from '@/types/trip'
import TripCard from '@/components/trips/TripCard'
import { Button } from '@/components/ui/Button'
import { Plus, MapPin, Calendar, Users, ArrowLeft, Car } from 'lucide-react'
import Link from 'next/link'

export default function TripsPage() {
  const { user } = useAuth()
  // ✅ Initialize as empty array instead of undefined/null
  const [trips, setTrips] = useState<Trip[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  useEffect(() => {
    loadTrips()
  }, [])

  const loadTrips = async () => {
    try {
      setIsLoading(true)
      setError('')
      console.log('Loading trips...')
      
      const tripsData = await getTrips()
      console.log('Trips loaded:', tripsData)
      
      // ✅ Ensure tripsData is always an array
      setTrips(Array.isArray(tripsData) ? tripsData : [])
    } catch (err: any) {
      console.error('Failed to load trips:', err)
      setError(err.message || 'Failed to fetch trips')
      // ✅ Set empty array on error
      setTrips([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleTripUpdate = (updatedTrip: Trip) => {
    setTrips(prevTrips => 
      prevTrips.map(trip => 
        trip.id === updatedTrip.id ? updatedTrip : trip
      )
    )
  }

  const handleTripDelete = (tripId: number) => {
    setTrips(prevTrips => 
      prevTrips.filter(trip => trip.id !== tripId)
    )
  }

  // ✅ Safe filtering with null check
  const filteredTrips = (trips || []).filter(trip => {
    if (filter === 'all') return true
    return trip.status === filter
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  My Trips
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage your rides and journeys
                </p>
              </div>
            </div>
            
            <Link href="/dashboard/trips/create">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Trip
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards - Safe calculations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Trips</p>
                <p className="text-2xl font-bold text-gray-900">{trips?.length || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Trips</p>
                <p className="text-2xl font-bold text-gray-900">
                  {trips?.filter(trip => trip.status === 'active').length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Passengers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {trips?.reduce((sum, trip) => sum + trip.currentPassengers, 0) || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">Error loading trips</p>
            <p className="text-sm mt-1">{error}</p>
            <button
              onClick={loadTrips}
              className="mt-2 text-sm text-red-600 hover:text-red-700 underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Your Trips</h2>
            <div className="flex space-x-2">
              {(['all', 'active', 'completed'] as const).map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === filterOption
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                  <span className="ml-1 text-xs">
                    ({filterOption === 'all' 
                      ? trips?.length || 0 
                      : trips?.filter(t => t.status === filterOption).length || 0
                    })
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading your trips...</span>
            </div>
          </div>
        ) : (
          /* Trips Grid */
          filteredTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrips.map((trip, index) => (
                <div 
                  key={trip.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <TripCard
                    trip={trip}
                    onUpdate={handleTripUpdate}
                    onDelete={handleTripDelete}
                    showActions={true}
                  />
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {filter === 'all' ? 'No trips yet' : `No ${filter} trips`}
              </h3>
              <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                {filter === 'all' 
                  ? 'Start your journey by creating your first trip.'
                  : `You don't have any ${filter} trips at the moment.`
                }
              </p>
              <Link href="/dashboard/trips/create">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2 mx-auto">
                  <Plus className="h-5 w-5" />
                  Create Your First Trip
                </button>
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  )
}
