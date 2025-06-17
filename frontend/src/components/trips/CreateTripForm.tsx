'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { createTrip } from '@/lib/api'
import { MapPin, Clock, Users, DollarSign } from 'lucide-react'

interface CreateTripFormData {
  from: string
  to: string
  departureTime: string
  maxPassengers: number
  pricePerPerson: number
  description: string
}

export default function CreateTripForm() {
  const [formData, setFormData] = useState<CreateTripFormData>({
    from: '',
    to: '',
    departureTime: '',
    maxPassengers: 1,
    pricePerPerson: 0,
    description: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await createTrip(formData)
      router.push('/dashboard/trips')
    } catch (err: any) {
      setError(err.message || 'Failed to create trip')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }))
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="From"
            type="text"
            name="from"
            value={formData.from}
            onChange={handleChange}
            required
            placeholder="Departure location"
            icon={<MapPin className="h-4 w-4" />}
          />

          <Input
            label="To"
            type="text"
            name="to"
            value={formData.to}
            onChange={handleChange}
            required
            placeholder="Destination"
            icon={<MapPin className="h-4 w-4" />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Departure Time"
            type="datetime-local"
            name="departureTime"
            value={formData.departureTime}
            onChange={handleChange}
            required
            icon={<Clock className="h-4 w-4" />}
          />

          <Input
            label="Max Passengers"
            type="number"
            name="maxPassengers"
            value={formData.maxPassengers}
            onChange={handleChange}
            min="1"
            max="8"
            required
            icon={<Users className="h-4 w-4" />}
          />

          <Input
            label="Price per Person ($)"
            type="number"
            name="pricePerPerson"
            value={formData.pricePerPerson}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            icon={<DollarSign className="h-4 w-4" />}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Additional details about your trip..."
          />
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? 'Creating Trip...' : 'Create Trip'}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
