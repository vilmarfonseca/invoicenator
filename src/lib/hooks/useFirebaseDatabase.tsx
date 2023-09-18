import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { useAuth } from '@/context/authContext'
import {
  deleteInvoiceFromFB,
  getCollection,
  saveInvoiceToFB,
} from '@/lib/database'
import { getTotalPrice } from '@/utils/helpers'
import { AuthUserType, InvoiceType } from '@/common/types'

const initialValues = {
  currentInvoice: {
    total: '0.00',
    items: [],
  },
  userInvoices: [],
  userData: null,
}

const setUserDataState = async (
  authUser: AuthUserType,
  setUserData: Function,
) => {
  if (authUser?.uid) {
    try {
      const data = await getCollection(authUser, 'userData')
      if (data) {
        setUserData(data as AuthUserType)
      }
    } catch (error) {
      throw new Error('Error while fetching user data: ' + error)
    }
  }
}

const useFirebaseDatabase = () => {
  const { authUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [currentInvoice, setCurrentInvoice] = useLocalStorage(
    'invoice',
    initialValues.currentInvoice,
  )
  const [invoices, setInvoices] = useState(initialValues.userInvoices)
  const [userData, setUserData] = useLocalStorage(
    'userData',
    initialValues.userData,
  )

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

  useEffect(() => {
    setUserDataState(authUser as AuthUserType, setUserData).catch((error) => {
      console.error(error)
    })
  }, [authUser, setUserData])

  useEffect(() => {
    updatedUserInvoices()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser, setInvoices])

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

  return {
    currentInvoice,
    deleteInvoice,
    invoices,
    loading,
    saveInvoice,
    setCurrentInvoice,
    userData,
  }
}

export default useFirebaseDatabase
