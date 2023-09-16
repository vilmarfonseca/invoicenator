'use client'

import SelectClient from '@/components/fields/SelectClient'
import SelectStatus from '@/components/fields/SelectStatus'
import InputDueDate from '@/components/fields/InputDueDate'
import InvoiceItems from '@/components/fields/groups/InvoiceItems'

export default function CreateInvoice() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 pb-16">
      <div className="items-start justify-between border-b md:flex">
        <div>
          <h3 className="text-gray-800 text-2xl font-bold py-4">Create Invoice</h3>
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
          <button className="block px-4 py-3 mt-2 h-full max-w-fit text-center text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm whitespace-nowrap">
            Create
          </button>
          <div className="flex items-baseline gap-2 h-full">
            <h5 className="text-gray-600 text-xl">Total amount:</h5>
            <span className="text-gray-600 font-bold text-xl">$ 0.00</span>
          </div>
        </div>
      </div>
    </div>
  )
}
