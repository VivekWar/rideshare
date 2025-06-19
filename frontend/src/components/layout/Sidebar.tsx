// src/components/layout/Sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Car, User, Search, Plus } from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'My Trips', href: '/dashboard/trips', icon: Car },
  { name: 'Create Trip', href: '/dashboard/trips/create', icon: Plus },
  { name: 'Search Trips', href: '/search', icon: Search },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 rounded-xl mx-3 mt-3 shadow-md">
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
      <Car className="w-5 h-5 text-blue-600" />
    </div>
    <h1 className="text-xl font-bold text-white">RideShare</h1>
  </div>
</div>




      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                ${isActive 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }
              `}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
