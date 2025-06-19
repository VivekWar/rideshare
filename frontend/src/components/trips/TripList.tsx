'use client'

import { useState } from 'react'
import TripCard from './TripCard'
import { Trip } from '@/types/trip'
import { MapPin, Plus } from 'lucide-react'
import Link from 'next/link'

// ✅ Updated props interface with showJoinButton
interface TripListProps {
  trips: Trip[]
  isLoading: boolean
  showJoinButton?: boolean          // Added this property
  onTripUpdate?: (updatedTrip: Trip) => void
  onTripDelete?: (tripId: number) => void
  onSearch?: (searchData: any) => void
}

export default function TripList({ 
  trips, 
  isLoading, 
  showJoinButton = false,          // Default value
  onTripUpdate, 
  onTripDelete,
  onSearch
}: TripListProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const filteredTrips = trips.filter(trip => {
    if (filter === 'all') return true
    return trip.status === filter
  })

  const handleTripUpdate = (updatedTrip: Trip) => {
    onTripUpdate?.(updatedTrip)
  }

  const handleTripDelete = (tripId: number) => {
    onTripDelete?.(tripId)
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading trips...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {showJoinButton ? 'Available Trips' : 'Your Trips'}
          </h2>
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
                  ({filterOption === 'all' ? trips.length : trips.filter(t => t.status === filterOption).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trips Grid */}
      {filteredTrips.length > 0 ? (
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
                showActions={!showJoinButton}  // Hide edit/delete for search results
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
            {showJoinButton ? 'No trips found' : 'No trips yet'}
          </h3>
          <p className="text-gray-600 mb-6 max-w-sm mx-auto">
            {showJoinButton 
              ? 'Try adjusting your search criteria to find more trips.'
              : 'Start your journey by creating your first trip.'
            }
          </p>
          {!showJoinButton && (
            <Link href="/dashboard/trips/create">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2 mx-auto">
                <Plus className="h-5 w-5" />
                Create Your First Trip
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
