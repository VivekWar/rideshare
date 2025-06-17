'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { MapPin, Calendar, DollarSign } from 'lucide-react'

interface SearchFormData {
  from: string
  to: string
  departureDate: string
  maxPrice: number
}

interface SearchFormProps {
  onSearch: (data: SearchFormData) => void
  isLoading: boolean
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [formData, setFormData] = useState<SearchFormData>({
    from: '',
    to: '',
    departureDate: '',
    maxPrice: 0
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }))
  }

  const handleReset = () => {
    setFormData({
      from: '',
      to: '',
      departureDate: '',
      maxPrice: 0
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Search Trips</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="From"
          type="text"
          name="from"
          value={formData.from}
          onChange={handleChange}
          placeholder="Departure location"
          icon={<MapPin className="h-4 w-4" />}
        />

        <Input
          label="To"
          type="text"
          name="to"
          value={formData.to}
          onChange={handleChange}
          placeholder="Destination"
          icon={<MapPin className="h-4 w-4" />}
        />

        <Input
          label="Departure Date"
          type="date"
          name="departureDate"
          value={formData.departureDate}
          onChange={handleChange}
          icon={<Calendar className="h-4 w-4" />}
        />

        <Input
          label="Max Price ($)"
          type="number"
          name="maxPrice"
          value={formData.maxPrice}
          onChange={handleChange}
          min="0"
          step="0.01"
          placeholder="Maximum price per person"
          icon={<DollarSign className="h-4 w-4" />}
        />

        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? 'Searching...' : 'Search Trips'}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="flex-1"
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  )
}
