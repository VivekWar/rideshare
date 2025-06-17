import CreateTripForm from '@/components/trips/CreateTripForm'

export default function CreateTripPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create New Trip</h1>
        <p className="text-gray-600 mt-1">
          Share your journey and help others save money
        </p>
      </div>
      <CreateTripForm />
    </div>
  )
}
