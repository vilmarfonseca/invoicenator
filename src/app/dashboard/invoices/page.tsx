'use client'
import InvoiceList from '@/components/InvoiceList'
import LoadingSpinner from '@/components/LoadingSpinner'
import NoInvoices from '@/components/NoInvoices'
import { useGlobalState } from '@/context/globalStateContext'
import Link from 'next/link'

export default function Invoices() {
  const { invoices, loading } = useGlobalState()

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    )
  }
  return (
    <>
      {!loading && invoices.length > 0 ? (
        <div>
          <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="items-start justify-between py-4 border-b md:flex">
              <div className="max-w-lg">
                <h3 className="text-gray-800 text-2xl font-bold">Invoices</h3>
                <p className="text-gray-600 mt-2">
                  Deatiled list of all your invoices
                </p>
              </div>
              <div className="mt-6 md:mt-0">
                <Link
                  href="/dashboard/invoices/create"
                  className="block px-4 py-2 text-center text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                >
                  Create Invoice
                </Link>
              </div>
            </div>
            <InvoiceList heading={false} />
          </div>
        </div>
      ) : (
        <NoInvoices />
      )}
    </>
  )
}
