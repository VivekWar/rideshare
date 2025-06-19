'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { MapPin, Calendar, IndianRupeeIcon } from 'lucide-react'

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
  
  const [errors, setErrors] = useState<Partial<SearchFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<SearchFormData> = {}
    
    // Validate locations
    if (!formData.from.trim()) {
      newErrors.from = 'Departure location is required'
    }
    
    if (!formData.to.trim()) {
      newErrors.to = 'Destination is required'
    }
    
    // Check if from and to are the same
    if (formData.from.trim().toLowerCase() === formData.to.trim().toLowerCase()) {
      newErrors.to = 'Destination must be different from departure location'
    }
    
    // Validate date (optional but if provided, should be future date)
    if (formData.departureDate) {
      const selectedDate = new Date(formData.departureDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (selectedDate < today) {
        newErrors.departureDate = 'Departure date cannot be in the past'
      }
    }
    
    // Validate price
    
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clear previous errors
    setErrors({})
    
    // Validate form
    if (!validateForm()) {
      return
    }

    try {
      const searchData = {
        from: formData.from.trim(),
        to: formData.to.trim(),
        departureDate: formData.departureDate,
        maxPrice: formData.maxPrice || 10000 // Set high default if 0
      }
      
      console.log('Submitting search data:', searchData) // Debug log
      onSearch(searchData)
      
    } catch (error) {
      console.error('Search error:', error)
      setErrors({ from: 'Search failed. Please try again.' })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof SearchFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? 
        (value === '' ? 0 : Math.max(0, parseInt(value) || 0)) : // ✅ Fixed number handling
        value
    }))
  }

  const handleReset = () => {
    setFormData({
      from: '',
      to: '',
      departureDate: '',
      maxPrice: 0
    })
    setErrors({})
  }

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Search Trips</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            label="From"
            type="text"
            name="from"
            value={formData.from}
            onChange={handleChange}
            placeholder="Departure location (e.g., Mumbai, Delhi)"
            required
            icon={<MapPin className="h-4 w-4" />}
          />
          {errors.from && (
            <p className="mt-1 text-sm text-red-600">{errors.from}</p>
          )}
        </div>

        <div>
          <Input
            label="To"
            type="text"
            name="to"
            value={formData.to}
            onChange={handleChange}
            placeholder="Destination (e.g., Pune, Bangalore)"
            required
            icon={<MapPin className="h-4 w-4" />}
          />
          {errors.to && (
            <p className="mt-1 text-sm text-red-600">{errors.to}</p>
          )}
        </div>

        <div>
          <Input
            label="Departure Date (Optional)"
            type="date"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            min={today} // ✅ Prevent past dates
            icon={<Calendar className="h-4 w-4" />}
          />
          {errors.departureDate && (
            <p className="mt-1 text-sm text-red-600">{errors.departureDate}</p>
          )}
        </div>

        <div>
          <Input
            label="Max Price (₹) - Optional"
            type="number"
            name="maxPrice"
            value={formData.maxPrice || ''} // ✅ Show empty instead of 0
            onChange={handleChange}
            min="0"
            step="10"
            placeholder="Maximum price per person"
            icon={<IndianRupeeIcon className="h-4 w-4" />}
          />
          {errors.maxPrice && (
            <p className="mt-1 text-sm text-red-600">{errors.maxPrice}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Leave empty to search all price ranges
          </p>
        </div>

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
