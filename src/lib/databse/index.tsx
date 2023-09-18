import { AuthUserType } from '@/common/types'
import { database } from '@/services/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const initializeNewUser = async (user: AuthUserType) => {
  try {
    if (!user || !user.uid) {
      throw new Error('Invalid user object or missing UID.')
    }

    const usersRef = doc(database, 'userData', user.uid)
    await setDoc(usersRef, { name: '' })

    const invoicesRef = doc(database, 'invoices', user.uid)
    await setDoc(invoicesRef, { invoices: [] })

    const clientsRef = doc(database, 'clients', user.uid)
    await setDoc(clientsRef, { clients: [] })

  } catch (error) {
    console.error('Error while initializing new user:', error)
    throw error
  }
}

export const getCollection = async (
  user: AuthUserType,
  collectionName: string,
) => {
  try {
    if (!user || !user.uid) {
      throw new Error('Invalid user object or missing UID.')
    }

    const docRef = doc(database, collectionName, user.uid)
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