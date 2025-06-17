'use client'

import { useTrips } from '@/hooks/useTrips'
import TripList from '@/components/trips/TripList'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default function TripsPage() {
  const { trips, isLoading, error } = useTrips()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
          <p className="text-gray-600 mt-1">
            Manage your trips and view passenger details
          </p>
        </div>
        <Link
          href="/dashboard/trips/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Trip
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <TripList trips={trips} isLoading={isLoading} />
    </div>
  )
}
