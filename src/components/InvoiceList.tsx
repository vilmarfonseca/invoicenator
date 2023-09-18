import { InvoiceType } from '@/common/types'
import { useGlobalState } from '@/context/globalStateContext'
import { parseDate } from '@/utils/helpers'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

interface InvoiceListProps {
  heading?: boolean
  filter?: {
    key: string
    value: string
  }
  setFilter?: Function
}

const InvoiceList: React.FC<InvoiceListProps> = ({
  heading = true,
  filter,
  setFilter = () => {},
}) => {
  const router = useRouter()
  const { invoices, setCurrentInvoice } = useGlobalState()

  const displayInvoices =
    filter?.key && filter?.value
      ? invoices.filter(
          (invoice: InvoiceType) =>
            invoice[filter.key].toLowerCase() === filter.value.toLowerCase(),
        )
      : [...invoices]

  async function handleinvoiceClick(invoice: InvoiceType) {
    setCurrentInvoice(invoice)
    router.push('/dashboard/invoices/edit')
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      {heading && (
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Invoices
            </h3>
          </div>
          <div className="mt-3 md:mt-0 gap-2 flex">
            {filter?.value && (
              <button
                onClick={() => setFilter(null)}
                className="block py-2 px-4 text-gray-700 hover:bg-gray-50 font-medium duration-150 active:bg-gray-100 border rounded-lg md:text-sm"
              >
                Reset Filters
              </button>
            )}
            <Link
              href="/dashboard/invoices/create"
              className="flex items-center px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Create Invoice
            </Link>
          </div>
        </div>
      )}
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Invoice #</th>
              <th className="py-3 px-6">Client Name</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Due Date</th>
              <th className="py-3 px-6">Total</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {displayInvoices.map((invoice: InvoiceType, idx: number) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">#{invoice.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.client.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={clsx(
                      'px-3 py-2 rounded-full font-semibold text-xs',
                      {
                        'text-green-600 bg-green-100':
                          invoice.status === 'Paid',
                        'text-red-600 bg-red-100': invoice.status !== 'Paid',
                      },
                    )}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {parseDate(invoice.dueDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  $ {invoice.total}
                </td>
                <td className="text-right px-6 whitespace-nowrap">
                  <button
                    onClick={() => handleinvoiceClick(invoice)}
                    className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default InvoiceList
