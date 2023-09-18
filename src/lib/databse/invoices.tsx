import { AuthUserType, InvoiceType } from '@/common/types'
import { database } from '@/services/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { getCollection } from '.'

export const saveInvoiceToFB = async (
  user: AuthUserType,
  newInvoice: InvoiceType,
) => {
  try {
    if (!user || !user.uid) {
      throw new Error('Invalid user object or missing UID.')
    }

    const oldInvoicesList = await getCollection(user, 'invoices')
    const newList = [...oldInvoicesList?.invoices]

    const existingInvoiceIdx = newList.findIndex(
      (item) => item.id === newInvoice.id,
    )

    if (newInvoice.id && existingInvoiceIdx > -1) {
      newList[existingInvoiceIdx] = newInvoice
    } else {
      newInvoice.id =
        newList.reduce(
          (maxId, item) => (item.id > maxId ? item.id : maxId),
          0,
        ) + 1
      newList.push(newInvoice)
    }

    const usersRef = doc(database, 'invoices', user.uid)
    await setDoc(usersRef, { invoices: newList })

    return true
  } catch (error) {
    console.error('Error while saving invoice to Firebase', error)
    throw error
  }
}

export const deleteInvoiceFromFB = async (
  user: AuthUserType,
  newInvoice: InvoiceType,
) => {
  try {
    if (!user || !user.uid) {
      throw new Error('Invalid user object or missing UID.')
    }

    const oldInvoicesList = await getCollection(user, 'invoices')
    const newList = [...oldInvoicesList?.invoices]

    const idxToRemove = newList.findIndex((item) => item.id === newInvoice.id)

    if (idxToRemove !== -1) {
      newList.splice(idxToRemove, 1)

      const usersRef = doc(database, 'invoices', user.uid)
      await setDoc(usersRef, { invoices: newList })
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('Error while removing invoice from Firebase', error)
    throw error
  }
}
