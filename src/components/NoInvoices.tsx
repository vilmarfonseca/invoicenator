import { motion } from 'framer-motion'
import Link from 'next/link'

const NoInvoices = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: 1,
        duration: 0.5,
      }}
      className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8"
    >
      <div className="max-w-lg mx-auto space-y-3 text-center">
        <h3 className="text-indigo-600 font-semibold">No Content Found</h3>
        <p className="text-gray-800 text-4xl font-semibold sm:text-5xl">
          You have no invoices
        </p>
        <p className="text-gray-600">
          Create your new invoice and start managing your business today
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/dashboard/invoices/create"
            className="block py-2 px-4 text-white font-medium bg-indigo-600 duration-200 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg"
          >
            Create invoice
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default NoInvoices
