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
  setInvoices: Function
  saveInvoice: Function
  deleteInvoice: Function
  setCurrentInvoice: Function
  clients: Array<ClientType>
  setClients: Function
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
  setInvoices: () => {},
  saveInvoice: () => {},
  deleteInvoice: () => {},
  setCurrentInvoice: () => {},
  clients: [],
  setClients: () => {},
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
