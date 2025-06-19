'use client'

import { useState, useEffect } from 'react'
import { searchTrips, getTrips, joinTrip } from '@/lib/api'
import { Trip } from '@/types/trip'
import SearchForm from '@/components/trips/SearchForm'
import TripCard from '@/components/trips/TripCard'
import { MapPin, Search, Users, Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface SearchFormData {
  from: string
  to: string
  departureDate: string
  maxPrice: number
}

export default function SearchPage() {
  // ✅ Initialize as empty array to prevent null errors
  const [trips, setTrips] = useState<Trip[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  // Load all trips initially
  useEffect(() => {
    loadAllTrips()
  }, [])

  const loadAllTrips = async () => {
    try {
      setIsLoading(true)
      setError('')
      const allTrips = await getTrips()
      // ✅ Ensure allTrips is always an array
      setTrips(Array.isArray(allTrips) ? allTrips : [])
    } catch (err: any) {
      console.error('Failed to load trips:', err)
      setError(err.message || 'Failed to load trips')
      setTrips([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async (searchData: SearchFormData) => {
    try {
      setIsSearching(true)
      setError('')
      setHasSearched(true)
      
      console.log('Searching trips with:', searchData)
      
      const results = await searchTrips(searchData)
      console.log('Search results:', results)
      
      // ✅ Ensure results is always an array
      setTrips(Array.isArray(results) ? results : [])
    } catch (err: any) {
      console.error('Search error:', err)
      setError(err.message || 'Search failed')
      setTrips([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleTripUpdate = (updatedTrip: Trip) => {
    setTrips(prevTrips => 
      prevTrips.map(trip => 
        trip.id === updatedTrip.id ? updatedTrip : trip
      )
    )
  }

  const handleJoinTrip = async (tripId: number) => {
    try {
      await joinTrip(tripId)
      
      setTrips(prevTrips =>
        prevTrips.map(trip => 
          trip.id === tripId 
            ? { ...trip, currentPassengers: trip.currentPassengers + 1 }
            : trip
        )
      )
    } catch (err: any) {
      console.error('Join trip error:', err)
      setError(err.message || 'Failed to join trip')
    }
  }

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
                  Find Your Perfect Ride 🚗
                </h1>
                <p className="text-gray-600 mt-1">
                  Search and join trips that match your journey
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Left-Right Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Side - Search Form (4 columns) */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              {/* Search Form Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                  <div className="flex items-center gap-3">
                    <Search className="h-6 w-6" />
                    <div>
                      <h2 className="text-xl font-bold">Search Trips</h2>
                      <p className="text-blue-100 text-sm">Find rides that match your journey</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <SearchForm onSearch={handleSearch} isLoading={isSearching} />
                </div>
              </div>

              {/* Search Stats Card */}
              {hasSearched && (
                <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-gray-900 text-sm">
                        {trips?.length || 0} trip{(trips?.length || 0) !== 1 ? 's' : ''} found
                      </span>
                    </div>
                    <button
                      onClick={loadAllTrips}
                      className="text-xs text-blue-600 hover:text-blue-700 underline"
                    >
                      Show all
                    </button>
                  </div>
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    <p className="font-medium text-sm">Search Error</p>
                  </div>
                  <p className="text-xs mt-1">{error}</p>
                  <button
                    onClick={() => hasSearched ? handleSearch({} as SearchFormData) : loadAllTrips()}
                    className="mt-2 text-xs text-red-600 hover:text-red-700 underline"
                  >
                    Try again
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Trip Results (8 columns) */}
          <div className="lg:col-span-8">
            {/* Results Header */}
            <div className="bg-white rounded-xl shadow-lg p-4 mb-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {hasSearched ? 'Search Results' : 'Available Trips'}
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{trips?.length || 0} trips</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Updated now</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {(isLoading || isSearching) ? (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">
                    {isSearching ? 'Searching trips...' : 'Loading trips...'}
                  </span>
                </div>
              </div>
            ) : (
              /* Trip Results Grid */
              (trips && trips.length > 0) ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {trips.map((trip, index) => (
                    <div 
                      key={trip.id} 
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <TripCard
                        trip={trip}
                        onUpdate={handleTripUpdate}
                        showActions={true}
                        onJoin={handleJoinTrip}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {hasSearched ? 'No trips found' : 'Available Trips'}
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                    {hasSearched 
                      ? 'Try adjusting your search criteria to find more trips.'
                      : 'Use the search form on the left to find trips that match your journey.'
                    }
                  </p>
                  {!hasSearched && (
                    <div className="bg-blue-50 rounded-lg p-4 text-left max-w-md mx-auto">
                      <h4 className="font-medium text-blue-900 mb-2">Quick Tips:</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Enter your departure and destination locations</li>
                        <li>• Set your preferred travel date</li>
                        <li>• Adjust maximum price if needed</li>
                        <li>• Click search to find matching trips</li>
                      </ul>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
