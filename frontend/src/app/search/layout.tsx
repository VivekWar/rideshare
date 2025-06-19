import DashboardLayout from '@/app/dashboard/layout'

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
