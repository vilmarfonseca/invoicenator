'use client'
import { ClientType, InvoiceType } from '@/common/types'
import useFirebaseDatabase from '@/lib/hooks/useFirebaseDatabase'
import { createContext, useContext } from 'react'

type GlobalContextType = {
  loading: boolean
  action: string
  currentInvoice: InvoiceType
  currentClient: ClientType
  invoices: Array<InvoiceType>
  saveInvoice: Function
  deleteInvoice: Function
  setCurrentInvoice: Function
  clients: Array<ClientType>
  saveClient: Function
  deleteClient: Function
  setCurrentClient: Function
}

export const initialValues = {
  loading: true,
  action: "",
  currentClient: {
    name: '',
    id: 0,
  },
  currentInvoice: {
    client: {
      name: '',
      id: 0,
    },
    status: '',
    dueDate: '',
    items: [],
    total: '',
    id: 0,
  },
  invoices: [],
  saveInvoice: () => {},
  deleteInvoice: () => {},
  setCurrentInvoice: () => {},
  clients: [],
  saveClient: () => {},
  deleteClient: () => {},
  setCurrentClient: () => {},
  userInvoices: [],
  userClients: [],
}

export const GlobalContext = createContext<GlobalContextType>(initialValues)

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
