'use client'

import { useState } from 'react'
import SearchForm from '@/components/trips/SearchForm'
import TripList from '@/components/trips/TripList'
import { Trip } from '@/types/trip'
import { searchTrips } from '@/lib/api'

export default function SearchPage() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (searchData: any) => {
    setIsLoading(true)
    setError('')

    try {
      const results = await searchTrips(searchData)
      setTrips(results)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find a Ride</h1>
          <p className="text-gray-600 mt-1">
            Search for available trips and join fellow travelers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          </div>
          <div className="lg:col-span-2">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}
            <TripList trips={trips} isLoading={isLoading} showJoinButton />
          </div>
        </div>
      </div>
    </div>
  )
}
