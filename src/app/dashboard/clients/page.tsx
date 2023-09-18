'use client'
import ClientList from '@/components/ClientList'
import LoadingSpinner from '@/components/LoadingSpinner'
import NoContent from '@/components/NoContent'
import { useGlobalState } from '@/context/globalStateContext'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Clients() {
  const { clients, loading } = useGlobalState()

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    )
  }
  return (
    <>
      {!loading && clients?.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
          }}
        >
          <div className="max-w-screen-xl mx-auto px-4 md:px-8 pb-20">
            <div className="items-start justify-between py-4 border-b md:flex">
              <div className="max-w-lg">
                <h3 className="text-gray-800 text-2xl font-bold">Clients</h3>
                <p className="text-gray-600 mt-2">
                  Deatiled list of all your clients
                </p>
              </div>
              <div className="mt-6 md:mt-0">
                <Link
                  href="/dashboard/clients/create"
                  className="block px-4 py-2 text-center text-white duration-200 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                >
                  Create Client
                </Link>
              </div>
            </div>
            <ClientList heading={false} />
          </div>
        </motion.div>
      ) : (
        <NoContent contentType='client' />
      )}
    </>
  )
}
