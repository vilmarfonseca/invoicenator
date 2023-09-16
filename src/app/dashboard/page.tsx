'use client'
import InvoiceList from '@/components/InvoiceList'
import OverviewCards from '@/components/OverviewCards'

export default function Dashboard() {
  return (
    <div className="pl-80">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between py-4 border-b md:flex">
          <div>
            <h3 className="text-gray-800 text-2xl font-bold">Overview</h3>
          </div>
        </div>
      </div>
      <OverviewCards />
      <InvoiceList />
    </div>
  )
}
