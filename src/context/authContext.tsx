'use client'
import useFirebaseAuth from '@/lib/hooks/useFirebaseAuth'
import { createContext, useContext } from 'react'

type AuthUser = {
  uid: string
  email: string
}

type AuthContextType = {
  authUser: AuthUser | null
  loading: boolean
}

export const AuthContext = createContext<AuthContextType>({
  authUser: null,
  loading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useFirebaseAuth()
  return <AuthContext.Provider value={auth as any}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
