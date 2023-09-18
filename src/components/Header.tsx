'use client'
import { AuthContext } from '@/context/authContext'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import Logo from './Logo'

type DrapdownStateType = {
  isActive: boolean
  idx: number | null
}

type NavigationItem = {
  title: string
  path: string
  icon?: JSX.Element
  desc?: string
  label?: string
  navs?: NavigationItem[]
}

const Header = () => {
  const { currentUser }: any = useContext(AuthContext)
  const [state, setState] = useState(false)
  const [drapdownState, setDrapdownState] = useState<DrapdownStateType>({
    isActive: false,
    idx: null,
  })

  const navigation: NavigationItem[] = [
    { title: 'Customers', path: '#' },
    { title: 'Features', path: '#' },
    { title: 'Pricing', path: '#' },
  ]

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target as Element
      if (!target?.closest('.nav-menu'))
        setDrapdownState({ isActive: false, idx: null })
    }
  }, [])

  return (
    <>
      <nav
        className={`relative z-20 bg-white w-full md:static md:text-sm md:border-none ${
          state ? 'shadow-lg rounded-b-xl md:shadow-none' : ''
        }`}
      >
        <div className="items-center gap-x-8 px-4 max-w-screen-xl mx-auto md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link href="/">
              <Logo />
            </Link>
            <div className="md:hidden">
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setState(!state)}
              >
                {state ? (
                  <svg
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
                  </svg>
                ) : (
                  <svg
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
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div
            className={`nav-menu flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              state ? 'block' : 'hidden'
            }`}
          >
            <ul className="items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
              {navigation.map((item, idx) => {
                return (
                  <li key={idx}>
                    <Link
                      href={item.path}
                      className="block text-gray-700 hover:text-indigo-600"
                    >
                      {item.title}
                    </Link>

                    {drapdownState.idx == idx && drapdownState.isActive ? (
                      <div className="mt-6 inset-x-0 top-20 w-full md:absolute md:border-y md:shadow-md md:mt-0">
                        <ul className="max-w-screen-xl mx-auto grid items-center gap-6 md:p-8 md:grid-cols-2 lg:grid-cols-3">
                          {item.navs &&
                            item.navs.map((dropdownItem, idx) => (
                              <li key={idx}>
                                <p className="text-indigo-600 text-sm">
                                  {dropdownItem.label}
                                </p>
                                <ul className="mt-5 space-y-6">
                                  {dropdownItem.navs?.map(
                                    (navItem: NavigationItem, idx: number) => (
                                      <li key={idx} className="group">
                                        <a
                                          href={navItem.path}
                                          className="flex gap-3 items-center"
                                        >
                                          <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center duration-150 group-hover:bg-indigo-600 group-hover:text-white md:w-14 md:h-14">
                                            {navItem.icon}
                                          </div>
                                          <div>
                                            <span className="text-gray-800 duration-200 group-hover:text-indigo-600 text-sm font-medium md:text-base">
                                              {navItem.title}
                                            </span>
                                            <p className="text-sm text-gray-600 group-hover:text-gray-800 mt-1">
                                              {navItem.desc}
                                            </p>
                                          </div>
                                        </a>
                                      </li>
                                    ),
                                  )}
                                </ul>
                              </li>
                            ))}
                        </ul>
                      </div>
                    ) : (
                      ''
                    )}
                  </li>
                )
              })}
              <div className="flex-1 items-center justify-end gap-x-6 space-y-3 md:flex md:space-y-0">
                {!currentUser && (
                  <li>
                    <Link
                      href="/auth/login"
                      className="block py-3 text-center text-gray-700 hover:text-indigo-600 border rounded-lg md:border-none"
                    >
                      Log in
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    href={currentUser ? '/dashboard' : '/auth/signup'}
                    className="block py-3 px-4 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline"
                  >
                    {currentUser ? 'Dashboard' : 'Get Started'}
                  </Link>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
      {state ? (
        <div
          className="z-10 fixed top-0 w-screen h-screen bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setState(false)}
        ></div>
      ) : (
        ''
      )}
    </>
  )
}

export default Header
