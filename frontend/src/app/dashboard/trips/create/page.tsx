'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CreateTripForm from '@/components/trips/CreateTripForm'
import { ArrowLeft, MapPin, Users, Calendar, IndianRupee, Info, Shield, Star } from 'lucide-react'
import Link from 'next/link'

export default function CreateTripPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFormSubmit = (isLoading: boolean) => {
    setIsSubmitting(isLoading)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Compact Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Create New Trip
                </h1>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Step 1 of 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Optimized Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          
          {/* Main Form - Takes 3/4 width on large screens */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Compact Form Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Trip Details</h2>
                    <p className="text-blue-100 text-sm">Fill in your journey information</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-2">
                    <MapPin className="h-6 w-6" />
                  </div>
                </div>
              </div>

              {/* Form Content with Better Spacing */}
              <div className="p-6">
                <CreateTripForm  />
              </div>
            </div>
          </div>

          {/* Compact Sidebar - Takes 1/4 width */}
          <div className="xl:col-span-1 space-y-4">
            
            {/* Quick Benefits - Condensed */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-green-100 rounded-lg">
                  <Users className="h-4 w-4 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Why Share?</h3>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <p className="text-xs text-gray-700">Split costs & save money</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <p className="text-xs text-gray-700">Meet fellow travelers</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  <p className="text-xs text-gray-700">Reduce carbon footprint</p>
                </div>
              </div>
            </div>

            {/* Compact Tips */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-4 w-4 text-amber-600" />
                <h3 className="font-semibold text-gray-900 text-sm">Quick Tips</h3>
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <MapPin className="h-3 w-3 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Be specific about locations</p>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="h-3 w-3 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Set realistic departure times</p>
                </div>
                <div className="flex items-start gap-2">
                  <IndianRupee className="h-3 w-3 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Price fairly for fuel & tolls</p>
                </div>
              </div>
            </div>

            {/* Safety Guidelines - Compact */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-4 w-4 text-blue-600" />
                <h3 className="font-semibold text-gray-900 text-sm">Stay Safe</h3>
              </div>
              <div className="space-y-1 text-xs text-gray-700">
                <p>• Verify passenger profiles</p>
                <p>• Share trip details with contacts</p>
                <p>• Keep emergency numbers handy</p>
                <p>• Trust your instincts</p>
              </div>
            </div>

            
          </div>
        </div>

        {/* Loading Overlay */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Creating Your Trip</h3>
              <p className="text-gray-600">Please wait while we set up your journey...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
