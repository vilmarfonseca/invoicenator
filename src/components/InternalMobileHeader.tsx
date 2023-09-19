'use client'
import { AuthContext, useAuth } from '@/context/authContext'
import useDeviceType from '@/lib/hooks/useDeviceType'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useContext, useState } from 'react'
import Logo from './Logo'

type NavigationItem = {
  title: string
  url: string
  icon?: JSX.Element
  desc?: string
  label?: string
  navs?: NavigationItem[]
}

const InternalMobileHeader = () => {
  const { currentUser }: any = useContext(AuthContext)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isDesktop, isTablet } = useDeviceType()
  const { logout } = useAuth()

  async function handleLogout() {
    setMobileOpen(false)
    logout()
  }

  const navigation: NavigationItem[] = [
    { title: 'Overview', url: '/dashboard' },
    { title: 'Invoices', url: '/dashboard/invoices' },
    { title: 'Clients', url: '/dashboard/clients' },
  ]

  return (
    <>
      <nav
        className={`relative z-20 pt-2 bg-white w-full md:static md:text-sm md:border-none ${
          mobileOpen ? 'shadow-lg rounded-b-xl md:shadow-none' : ''
        }`}
      >
        <div className="items-center gap-x-8 px-4 max-w-screen-xl mx-auto md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link href="/dashboard">
              <Logo />
            </Link>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="md:hidden"
            >
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <AnimatePresence>
                  {mobileOpen ? (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ rotate: 180, scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z"
                        clipRule="evenodd"
                      />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          </div>

          <AnimatePresence>
            {((mobileOpen && !isDesktop) || isDesktop || isTablet) && (
              <motion.div
                className={`nav-menu flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                <ul className="items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                  {navigation.map((item, idx) => {
                    return (
                      <li key={idx}>
                        <Link
                          href={item.url}
                          onClick={() => setMobileOpen(false)}
                          className="block text-gray-700 hover:text-indigo-600"
                        >
                          {item.title}
                        </Link>
                      </li>
                    )
                  })}
                  <div className="flex-1 items-center justify-end gap-x-6 space-y-3 md:flex md:space-y-0">
                    {!currentUser && (
                      <li>
                        <button
                          onClick={() => handleLogout()}
                          className="block w-full py-3 text-center text-gray-700 hover:text-indigo-600 border rounded-lg md:border-none"
                        >
                          Logout
                        </button>
                      </li>
                    )}
                  </div>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="z-10 fixed top-0 w-screen h-screen bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          ></motion.div>
        ) : (
          ''
        )}
      </AnimatePresence>
    </>
  )
}

export default InternalMobileHeader
