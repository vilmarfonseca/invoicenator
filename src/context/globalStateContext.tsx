'use client'
import useFirebaseDatabase from '@/lib/hooks/useFirebaseDatabase'
import { createContext, useContext } from 'react'

type GlobalContextType = {
  loading: boolean
  currentInvoice: object
  setCurrentInvoice: Function
}

export const GlobalContext = createContext<GlobalContextType>({
  loading: true,
  currentInvoice: {},
  setCurrentInvoice: () => {},
})

export function GlobalStateProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const state = useFirebaseDatabase()
  return (
    <GlobalContext.Provider value={state as any}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalState = () => useContext(GlobalContext)
