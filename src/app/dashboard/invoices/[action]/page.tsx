'use client'

import InvoiceItems from '@/components/FieldGroups/InvoiceItemsGroup'
import InputDueDate from '@/components/Fields/InputDueDate'
import SelectClient from '@/components/Fields/SelectClient'
import SelectStatus from '@/components/Fields/SelectStatus'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useGlobalState } from '@/context/globalStateContext'
import { notFound, useRouter, redirect } from 'next/navigation'
import { useState } from 'react'

interface InvoiceActionsPageProps {
  params: {
    action: string
  }
}

const allowedActions = ['create', 'edit']

export default function InvoiceActionsPage({
  params,
}: InvoiceActionsPageProps) {
  const action = params.action
  const router = useRouter()
  const {
    currentInvoice,
    saveInvoice,
    deleteInvoice,
    setCurrentInvoice,
    loading,
  } = useGlobalState()

  async function redirectOnSucess() {
    router.push('/dashboard/invoices')
    setCurrentInvoice({})
  }

  async function handleSaveInvoice() {
    const res = await saveInvoice(currentInvoice)

    if (res) {
      redirectOnSucess()
    }
  }

  async function handleDeleteInvoice() {
    const res = await deleteInvoice(currentInvoice)

    if (res) {
      redirectOnSucess()
    }
  }

  if (
    !allowedActions.includes(params.action) ||
    (action === 'edit' && !currentInvoice)
  ) {
    notFound()
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 pb-16">
      <div className="items-start justify-between border-b md:flex">
        <div>
          <h3 className="text-gray-800 text-2xl font-bold py-4 capitalize">
            {action} Invoice {action === 'edit' ? `#${currentInvoice.id}` : ''}
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
          <div className="flex gap-4">
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
                <LoadingSpinner className="w-5 h-5" />
              ) : (
                <span>Save</span>
              )}
            </button>
            <button
              onClick={() => handleDeleteInvoice()}
              className="block px-4 py-3 mt-2 h-full max-w-fit text-center text-white duration-150 font-medium bg-red-600 disabled:bg-gray-600 rounded-lg hover:bg-red-500 disabled:hover:bg-gray-500 active:bg-red-700 md:text-sm whitespace-nowrap"
            >
              {loading ? (
                <LoadingSpinner className="w-5 h-5" />
              ) : (
                <span>Delete</span>
              )}
            </button>
          </div>
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
