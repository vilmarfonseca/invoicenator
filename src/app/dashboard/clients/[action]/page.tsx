'use client'

import LoadingSpinner from '@/components/LoadingSpinner'
import { useGlobalState } from '@/context/globalStateContext'
import { initialValues } from '@/context/globalStateContext'
import { motion } from 'framer-motion'
import { notFound, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ClientActionsPageProps {
  params: {
    action: string
  }
}

const allowedActions = ['create', 'edit']

export default function ClientActionsPage({ params }: ClientActionsPageProps) {
  const action = params.action
  const router = useRouter()
  const {
    currentClient,
    saveClient,
    deleteClient,
    setCurrentClient,
    loading,
  } = useGlobalState()
  const [client, setClient] = useState(
    action === 'edit' ? currentClient : initialValues.currentClient,
  )

  useEffect(() => {
    if (action === 'create') {
      setCurrentClient({})
    }
  }, [action, setCurrentClient])

  const handleInputChange = (value: string) => {
    setClient({
      ...client,
      ...{
        name: value,
      },
    })
  }

  async function redirectOnSucess() {
    setCurrentClient({})
    router.push('/dashboard/clients')
  }

  async function handleSaveClient() {
    const res = await saveClient(action === 'edit' ? currentClient : client)

    if (res) {
      redirectOnSucess()
    }
  }

  async function handleDeleteClient() {
    const res = await deleteClient(action === 'edit' ? currentClient : client)

    if (res) {
      redirectOnSucess()
    }
  }

  if (
    !allowedActions.includes(params.action) ||
    (action === 'edit' && !currentClient)
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
            {action} Client {action === 'edit' ? `#${currentClient.id}` : ''}
          </h3>
        </div>
      </div>
      <div className="flex items-end justify-between w-full mx-auto mt-12 flex-wrap gap-8 px-4">
        <div className="flex flex-col w-full">
          <h4 className="text-gray-800 text-xl font-bold mb-4">Information</h4>
          <div className="flex justify-between">
            <div className="w-full flex flex-col">
              <label className="text-gray-600">Client Name</label>
              <input
                type="text"
                className="w-full px-3 max-w-xs mt-2 py-2 text-gray-500 bg-white border rounded-md shadow-sm focus:border-indigo-600"
                placeholder="John Doe"
                value={client.name}
                onChange={(e) => handleInputChange(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex w-full justify-between items-end gap-6">
          <div className="flex gap-4">
            <button
              disabled={!client.name}
              onClick={() => handleSaveClient()}
              className="block px-4 py-3 mt-2 h-full max-w-fit text-center text-white duration-200 font-medium bg-indigo-600 disabled:bg-gray-600 rounded-lg hover:bg-indigo-500 disabled:hover:bg-gray-500 active:bg-indigo-700 md:text-sm whitespace-nowrap"
            >
              Save
            </button>
            {action === 'edit' && (
              <button
                onClick={() => handleDeleteClient()}
                className="block px-4 py-3 mt-2 h-full max-w-fit text-center text-white duration-200 font-medium bg-red-600 disabled:bg-gray-600 rounded-lg hover:bg-red-500 disabled:hover:bg-gray-500 active:bg-red-700 md:text-sm whitespace-nowrap"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
