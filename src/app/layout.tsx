import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/context/authContext'
import { GlobalStateProvider } from '@/context/globalStateContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Invoicenator',
  description: 'The best invoice management app on the planet.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <GlobalStateProvider>{children}</GlobalStateProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
