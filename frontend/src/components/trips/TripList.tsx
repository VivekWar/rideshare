import { Trip } from '@/types/trip'
import TripCard from './TripCard'
import Loading from '@/components/common/Loading'
import { Car } from 'lucide-react'
import { joinTrip } from '@/lib/api'
import { useState } from 'react'

interface TripListProps {
  trips: Trip[]
  isLoading: boolean
  showJoinButton?: boolean
}

export default function TripList({ trips, isLoading, showJoinButton = false }: TripListProps) {
  const [joiningTrip, setJoiningTrip] = useState<number | null>(null)

  const handleJoinTrip = async (tripId: number) => {
    setJoiningTrip(tripId)
    try {
      await joinTrip(tripId)
      // Refresh trips or show success message
    } catch (error) {
      console.error('Failed to join trip:', error)
    } finally {
      setJoiningTrip(null)
    }
  }

  if (isLoading) {
    return <Loading />
  }

  if (trips.length === 0) {
    return (
      <div className="text-center py-12">
        <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No trips found</h3>
        <p className="text-gray-600">
          {showJoinButton 
            ? "Try adjusting your search criteria to find more trips."
            : "You haven't created any trips yet."
          }
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {trips.map((trip) => (
        <TripCard
          key={trip.id}
          trip={trip}
          showJoinButton={showJoinButton}
          onJoin={showJoinButton ? handleJoinTrip : undefined}
        />
      ))}
    </div>
  )
}
