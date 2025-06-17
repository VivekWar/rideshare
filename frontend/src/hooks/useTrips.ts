// src/hooks/useTrips.ts

import { useState, useEffect } from 'react'
import { Trip } from '@/types/trip'
import { getTrips } from '@/lib/api'

export function useTrips() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const tripsData = await getTrips()
        setTrips(tripsData)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrips()
  }, [])

  return {
    trips,
    isLoading,
    error,
    setTrips,
  }
}
