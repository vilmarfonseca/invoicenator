'use client'
import InternalMobileHeader from '@/components/InternalMobileHeader'
import Sidebar from '@/components/Sidebar'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { authUser, loading } = useAuth()

  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/auth/login')
    }
  }, [authUser, loading, router])

  if (!loading && authUser) {
    return (
      <div>
        <div className="block md:hidden">
          <InternalMobileHeader />
        </div>
        <div className="hidden md:flex">
          <Sidebar />
        </div>
        <main className="ml-0 md:ml-60 lg:ml-80 w-full md:w-[calc(100vw-16rem)] lg:w-[calc(100vw-20rem)] h-[100vh] py-2 md:py-10">
          {children}
        </main>
      </div>
    )
  }
}
