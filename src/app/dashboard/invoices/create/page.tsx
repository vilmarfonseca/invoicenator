'use client'

import InvoiceItems from '@/components/FieldGroups/InvoiceItems'
import InputDueDate from '@/components/Fields/InputDueDate'
import SelectClient from '@/components/Fields/SelectClient'
import SelectStatus from '@/components/Fields/SelectStatus'
import { useGlobalState } from '@/context/globalStateContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateInvoice() {
  const router = useRouter()
  const { currentInvoice, saveInvoice } = useGlobalState()
  const [loading, setLoading] = useState<boolean>(false)

  async function handleSaveInvoice() {
    setLoading(true)
    const res = await saveInvoice(currentInvoice)

    if (res) {
      setLoading(false)
      router.push('/dashboard/invoices')
    }
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 pb-16">
      <div className="items-start justify-between border-b md:flex">
        <div>
          <h3 className="text-gray-800 text-2xl font-bold py-4">
            Create Invoice
          </h3>
        </div>
      </div>
      <div className="flex items-end justify-between w-full mx-auto mt-12 flex-wrap gap-8 px-4">
        <div className="flex flex-col w-full">
          <h4 className="text-gray-800 text-xl font-bold mb-4">Information</h4>
          <div className="flex justify-between">
            <SelectClient />
            <div className="flex gap-4">
              <SelectStatus />
              <InputDueDate />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full py-10 gap-2">
          <h4 className="text-gray-800 text-xl font-bold mb-4">Items</h4>
          <InvoiceItems />
        </div>

        <div className="flex w-full justify-between items-end gap-6">
          <button
            disabled={
              !(currentInvoice?.items?.length > 0) ||
              !currentInvoice?.client ||
              !currentInvoice.status ||
              !currentInvoice.dueDate
            }
            onClick={() => handleSaveInvoice()}
            className="block px-4 py-3 mt-2 h-full max-w-fit text-center text-white duration-150 font-medium bg-indigo-600 disabled:bg-gray-600 rounded-lg hover:bg-indigo-500 disabled:hover:bg-gray-500 active:bg-indigo-700 md:text-sm whitespace-nowrap"
          >
            {loading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 animate-spin"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            ) : (
              <span>Save</span>
            )}
          </button>
          <div className="flex items-baseline gap-2 h-full">
            <h5 className="text-gray-600 text-xl">Total:</h5>
            <span className="text-gray-600 font-bold text-xl">
              $ {currentInvoice?.total}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
