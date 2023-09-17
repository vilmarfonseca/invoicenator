import { useAuth } from '@/context/authContext'
import { getUserData } from '@/lib/database'
import { useCallback, useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

export default function useFirebaseDatabase() {
  const [currentInvoice, setCurrentInvoice] = useState({})
  const [userData, setUserData] = useLocalStorage('userData', null)
  const { authUser } = useAuth()

  const setUserDataState = useCallback(async () => {
    if (authUser?.uid && !userData) {
      try {
        const data = await getUserData(authUser)
        if (data) {
          setUserData(data as any)
        }
      } catch (error) {
        console.error('Error while fetching initial user data:', error)
      }
    }
  }, [authUser, setUserData, userData])

  useEffect(() => {
    setUserDataState()
  }, [setUserDataState])



  return {
    userData,
    currentInvoice,
    setCurrentInvoice
  }
}
