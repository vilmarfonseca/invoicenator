import { ClientType, InvoiceType } from '@/common/types'
import { useAuth } from '@/context/authContext'
import { initialValues } from '@/context/globalStateContext'
import { getCollection } from '@/lib/databse'
import { deleteInvoiceFromFB, saveInvoiceToFB } from '@/lib/databse/invoices'
import { getTotalPrice } from '@/utils/helpers'
import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { deleteClientFromFB, saveClientToFB } from '../databse/clients'

const useFirebaseDatabase = () => {
  const { authUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [currentInvoice, setCurrentInvoice] = useLocalStorage(
    'invoice',
    initialValues.currentInvoice,
  )
  const [currentClient, setCurrentClient] = useLocalStorage(
    'client',
    initialValues.currentClient,
  )
  const [invoices, setInvoices] = useState(initialValues.userInvoices)
  const [clients, setClients] = useState(initialValues.userClients)

  const updatedUserInvoices = async () => {
    if (authUser?.uid) {
      setLoading(true)
      try {
        const data = await getCollection(authUser, 'invoices')
        if (data?.invoices) {
          setInvoices(data?.invoices)
        }
        setLoading(false)
      } catch (error) {
        throw new Error('Error fetching user invoices: ' + error)
      }
    }
  }

  const saveInvoice = async (invoice: InvoiceType) => {
    setLoading(true)
    if (authUser?.uid) {
      try {
        const data = await saveInvoiceToFB(authUser, invoice)
        if (data) {
          setLoading(false)
          setCurrentInvoice(initialValues.currentInvoice)
          updatedUserInvoices()
          return true
        }
      } catch (error) {
        throw new Error('Error while saving invoice: ' + error)
      }
    }
  }

  const deleteInvoice = async (invoice: InvoiceType) => {
    setLoading(true)
    if (authUser?.uid) {
      try {
        const data = await deleteInvoiceFromFB(authUser, invoice)
        if (data) {
          setLoading(false)
          setCurrentInvoice(initialValues.currentInvoice)
          updatedUserInvoices()
          return true
        }
      } catch (error) {
        throw new Error('Error while saving invoice: ' + error)
      }
    }
  }

  const updatedUserClients = async () => {
    if (authUser?.uid) {
      setLoading(true)
      try {
        const data = await getCollection(authUser, 'clients')
        if (data?.clients) {
          setClients(data?.clients)
        }
        setLoading(false)
      } catch (error) {
        throw new Error('Error fetching user clients: ' + error)
      }
    }
  }

  const saveClient = async (client: ClientType) => {
    setLoading(true)
    if (authUser?.uid) {
      try {
        const data = await saveClientToFB(authUser, client)
        if (data) {
          setLoading(false)
          setCurrentClient(initialValues.currentClient)
          updatedUserClients()
          return true
        }
      } catch (error) {
        throw new Error('Error while saving client: ' + error)
      }
    }
  }

  const deleteClient = async (client: ClientType) => {
    setLoading(true)
    if (authUser?.uid) {
      try {
        const data = await deleteClientFromFB(authUser, client)
        if (data) {
          setLoading(false)
          setCurrentClient(initialValues.currentClient)
          updatedUserClients()
          return true
        }
      } catch (error) {
        throw new Error('Error while saving client: ' + error)
      }
    }
  }

  useEffect(() => {
    updatedUserInvoices()
    updatedUserClients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser])

  useEffect(() => {
    if (
      !currentInvoice ||
      !currentInvoice.items ||
      currentInvoice.items.length === 0
    ) {
      return
    }

    const newTotal = getTotalPrice(currentInvoice.items)
    const newInvoice = { ...currentInvoice }

    if (newTotal !== currentInvoice.total) {
      newInvoice.total = newTotal
      setCurrentInvoice(newInvoice)
    }
  }, [currentInvoice, setCurrentInvoice])

  return {
    invoices,
    currentInvoice,
    clients,
    currentClient,
    loading,
    saveInvoice,
    deleteInvoice,
    setCurrentInvoice,
    saveClient,
    deleteClient,
    setCurrentClient,
  }
}

export default useFirebaseDatabase
