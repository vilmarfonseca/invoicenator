import InvoiceList from '@/components/InvoiceList'
import { database } from '@/services/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const initializeNewUser = async (currentUser: any) => {
  try {
    if (!currentUser || !currentUser.uid) {
      throw new Error('Invalid user object or missing UID.')
    }

    // Initialize User Data
    const usersRef = doc(database, 'userData', currentUser.uid)
    await setDoc(usersRef, { name: '' })

    // Initializ User Invoices
    const invoicesRef = doc(database, 'invoices', currentUser.uid)
    await setDoc(invoicesRef, { invoices: [] })
  } catch (error) {
    console.error('Error while initializing new user:', error)
    throw error
  }
}

export const getCollection = async (
  currentUser: any,
  collectionName: string,
) => {
  try {
    if (!currentUser || !currentUser.uid) {
      throw new Error('Invalid user object or missing UID.')
    }

    const docRef = doc(database, collectionName, currentUser.uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      console.log('No such document!')
      return null
    }
  } catch (error) {
    console.error('Error while getting user data:', error)
    throw error
  }
}

export const saveInvoiceToFB = async (
  user: any,
  userData: any,
  newInvoice: any,
) => {
  try {
    if (!user || !user.uid) {
      throw new Error('Invalid user object or missing UID.')
    }

    const oldInvoicesList = await getCollection(user, 'invoices')
    const newList = [...oldInvoicesList?.invoices]

    newInvoice.id = newList.length + 1

    newList.push(newInvoice)

    const usersRef = doc(database, 'invoices', user.uid)
    await setDoc(usersRef, { invoices: newList })
    return newInvoice

  } catch (error) {
    console.error('Error while saving invoice to Firebase', error)
    throw error
  }
}
