import { Trip } from '@/types/trip'
import { MapPin, Clock, Users, DollarSign } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface TripCardProps {
  trip: Trip
  showJoinButton?: boolean
  onJoin?: (tripId: number) => void
}

export default function TripCard({ trip, showJoinButton = false, onJoin }: TripCardProps) {
  const availableSeats = trip.maxPassengers - trip.currentPassengers

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center text-gray-700 mb-2">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="font-medium">{trip.from}</span>
            <span className="mx-2">→</span>
            <span className="font-medium">{trip.to}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="h-4 w-4 mr-2" />
            <span>{format(new Date(trip.departureTime), 'PPP p')}</span>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          trip.status === 'active' ? 'bg-green-100 text-green-800' :
          trip.status === 'completed' ? 'bg-blue-100 text-blue-800' :
          'bg-red-100 text-red-800'
        }`}>
          {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
        </span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-gray-600 text-sm">
          <Users className="h-4 w-4 mr-2" />
          <span>{availableSeats} seats available</span>
        </div>
        <div className="flex items-center text-gray-900 font-semibold">
          <DollarSign className="h-4 w-4 mr-1" />
          <span>${trip.pricePerPerson}</span>
        </div>
      </div>

      {trip.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {trip.description}
        </p>
      )}

      <div className="flex justify-between items-center">
        <Link
          href={`/dashboard/trips/${trip.id}`}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          View Details
        </Link>
        {showJoinButton && availableSeats > 0 && onJoin && (
          <Button
            size="sm"
            onClick={() => onJoin(trip.id)}
          >
            Join Trip
          </Button>
        )}
      </div>
    </div>
  )
}
