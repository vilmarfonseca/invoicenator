import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { useAuth } from '@/context/authContext'
import { getCollection, saveInvoiceToFB } from '@/lib/database'
import { getTotalPrice } from '@/utils/helpers'

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

const setUserInvoices = async (
  authUser: AuthUserType,
  setInvoicesData: Function,
  setLoading: Function,
) => {
  if (authUser?.uid) {
    setLoading(true)
    try {
      const data = await getCollection(authUser, 'invoices')
      if (data?.invoices) {
        setInvoicesData(data?.invoices)
      }
      setLoading(false)
    } catch (error) {
      throw new Error('Error fetching user invoices: ' + error)
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

  useEffect(() => {
    setUserDataState(authUser as AuthUserType, setUserData).catch((error) => {
      console.error(error)
    })
  }, [authUser, setUserData])

  useEffect(() => {
    setUserInvoices(authUser as AuthUserType, setInvoices, setLoading).catch(
      (error) => {
        console.error(error)
      },
    )
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
    if (authUser?.uid) {
      try {
        const data = await saveInvoiceToFB(authUser, invoice)
        if (data) {
          setCurrentInvoice(initialValues.currentInvoice)
          return true
        }
      } catch (error) {
        throw new Error('Error while saving invoice: ' + error)
      }
    }
  }

  return {
    userData,
    invoices,
    currentInvoice,
    setCurrentInvoice,
    saveInvoice,
    loading,
  }
}

export default useFirebaseDatabase
