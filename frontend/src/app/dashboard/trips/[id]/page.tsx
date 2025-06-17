'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getTrip } from '@/lib/api'
import { Trip } from '@/types/trip'
import Loading from '@/components/common/Loading'
import { MapPin, Clock, Users, DollarSign, User } from 'lucide-react'
import { format } from 'date-fns'

export default function TripDetailPage() {
  const params = useParams()
  const [trip, setTrip] = useState<Trip | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const tripData = await getTrip(Number(params.id))
        setTrip(tripData)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchTrip()
    }
  }, [params.id])

  if (isLoading) return <Loading />

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Trip not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Trip Details</h1>
            <p className="text-gray-600 mt-1">
              {trip.from} → {trip.to}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            trip.status === 'active' ? 'bg-green-100 text-green-800' :
            trip.status === 'completed' ? 'bg-blue-100 text-blue-800' :
            'bg-red-100 text-red-800'
          }`}>
            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <MapPin className="h-5 w-5 mr-3" />
              <div>
                <p className="font-medium">Route</p>
                <p className="text-sm">{trip.from} → {trip.to}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-700">
              <Clock className="h-5 w-5 mr-3" />
              <div>
                <p className="font-medium">Departure</p>
                <p className="text-sm">
                  {format(new Date(trip.departureTime), 'PPP p')}
                </p>
              </div>
            </div>
            <div className="flex items-center text-gray-700">
              <Users className="h-5 w-5 mr-3" />
              <div>
                <p className="font-medium">Passengers</p>
                <p className="text-sm">
                  {trip.currentPassengers} / {trip.maxPassengers}
                </p>
              </div>
            </div>
            <div className="flex items-center text-gray-700">
              <DollarSign className="h-5 w-5 mr-3" />
              <div>
                <p className="font-medium">Price per person</p>
                <p className="text-sm">${trip.pricePerPerson}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 text-sm">
              {trip.description || 'No description provided'}
            </p>
          </div>
        </div>

        {trip.driver && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-medium text-gray-900 mb-3">Driver Information</h3>
            <div className="flex items-center">
              <div className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">{trip.driver.name}</p>
                <p className="text-sm text-gray-600">{trip.driver.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
