import { AuthUserType, ClientType } from '@/common/types'
import { database } from '@/services/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { getCollection } from '.'

export const saveClientToFB = async (
  user: AuthUserType,
  newClient: ClientType,
) => {
  try {
    if (!user || !user.uid) {
      throw new Error('Invalid user object or missing UID.')
    }

    console.log(newClient, "newClient")

    const oldClientsList = await getCollection(user, 'clients')
    const newList = [...oldClientsList?.clients]

    const existingClientIdx = newList.findIndex(
      (item) => item.id === newClient.id,
    )

    if (newClient.id && existingClientIdx > -1) {
      newList[existingClientIdx] = newClient
    } else {
      newClient.id =
        newList.reduce(
          (maxId, item) => (item.id > maxId ? item.id : maxId),
          0,
        ) + 1
      newList.push(newClient)
    }

    const usersRef = doc(database, 'clients', user.uid)
    await setDoc(usersRef, { clients: newList })

    return true
  } catch (error) {
    console.error('Error while saving client to Firebase', error)
    throw error
  }
}

export const deleteClientFromFB = async (
  user: AuthUserType,
  newClient: ClientType,
) => {
  try {
    if (!user || !user.uid) {
      throw new Error('Invalid user object or missing UID.')
    }

    const oldClientsList = await getCollection(user, 'clients')
    const newList = [...oldClientsList?.clients]

    const idxToRemove = newList.findIndex((item) => item.id === newClient.id)

    if (idxToRemove !== -1) {
      newList.splice(idxToRemove, 1)

      const usersRef = doc(database, 'clients', user.uid)
      await setDoc(usersRef, { clients: newList })
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('Error while removing client from Firebase', error)
    throw error
  }
}
