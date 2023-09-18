'use client'

import InvoiceItems from '@/components/FieldGroups/InvoiceItemsGroup'
import InputDueDate from '@/components/Fields/InputDueDate'
import SelectClient from '@/components/Fields/SelectClient'
import SelectStatus from '@/components/Fields/SelectStatus'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useGlobalState } from '@/context/globalStateContext'
import { motion } from 'framer-motion'
import { notFound, useRouter } from 'next/navigation'
import { useEffect } from 'react'

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

  useEffect(() => {
    if (action === 'create') {
      setCurrentInvoice({})
    }
  }, [action, setCurrentInvoice])

  async function redirectOnSucess() {
    setCurrentInvoice({})
    router.push('/dashboard/invoices')
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

  if (loading) {
    return (
      <div className="text-black flex w-full justify-center items-center h-full">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
      }}
      className="max-w-screen-xl mx-auto px-4 md:px-8 pb-20"
    >
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
            <SelectClient action={action}/>
            <div className="flex gap-4">
              <SelectStatus action={action}/>
              <InputDueDate action={action}/>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full py-10 gap-2">
          <h4 className="text-gray-800 text-xl font-bold mb-4">Items</h4>
          <InvoiceItems action={action}/>
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
              className="block px-4 py-3 mt-2 h-full max-w-fit text-center text-white duration-200 font-medium bg-indigo-600 disabled:bg-gray-600 rounded-lg hover:bg-indigo-500 disabled:hover:bg-gray-500 active:bg-indigo-700 md:text-sm whitespace-nowrap"
            >
              Save
            </button>
            {action === 'edit' && (
              <button
                onClick={() => handleDeleteInvoice()}
                className="block px-4 py-3 mt-2 h-full max-w-fit text-center text-white duration-200 font-medium bg-red-600 disabled:bg-gray-600 rounded-lg hover:bg-red-500 disabled:hover:bg-gray-500 active:bg-red-700 md:text-sm whitespace-nowrap"
              >
                Delete
              </button>
            )}
          </div>
          <div className="flex items-baseline gap-2 h-full">
            <h5 className="text-gray-600 text-xl">Total:</h5>
            <span className="text-gray-600 font-bold text-xl">
              $ {currentInvoice?.total}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
