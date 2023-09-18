'use client'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { authUser, loading } = useAuth()

  useEffect(() => {
    if (!loading && authUser) {
      router.push('/dashboard')
    }
  }, [authUser, loading, router])

  if (!loading && !authUser) {
    return <>{children}</>
  }
}
