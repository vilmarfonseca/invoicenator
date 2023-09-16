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
    <>
      <Sidebar />
      <main className="ml-80 w-[calc(100vw-20rem)] h-[100vh] py-10">{children}</main>
    </>
  )
}
