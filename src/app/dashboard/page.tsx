'use client'
import InvoiceList from '@/components/InvoiceList'
import LoadingSpinner from '@/components/LoadingSpinner'
import NoContent from '@/components/NoContent'
import OverviewCards from '@/components/OverviewCards'
import { useGlobalState } from '@/context/globalStateContext'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Dashboard() {
  const { invoices, loading } = useGlobalState()
  const [filter, setFilter] = useState({
    key: '',
    value: '',
  })

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 pb-20">
      {loading ? (
        <div className="text-black flex justify-center items-center h-[100vh]">
          <LoadingSpinner />
        </div>
      ) : !loading && invoices?.length === 0 ? (
        <NoContent contentType='invoice' />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
          }}
        >
          <div className="items-start justify-between py-4 border-b md:flex">
            <div>
              <h3 className="text-gray-800 text-2xl font-bold">Overview</h3>
            </div>
          </div>
          <OverviewCards setFilter={setFilter} />
          <InvoiceList setFilter={setFilter} filter={filter} />
        </motion.div>
      )}
    </div>
  )
}
