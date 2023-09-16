import Sidebar from '@/components/Sidebar'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Invoicenator | Dashboard',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <Sidebar />
      {children}
    </main>
  )
}
