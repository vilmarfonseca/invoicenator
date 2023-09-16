'use client'
import Features from '@/components/Features'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Prices from '@/components/Prices'
import Stats from '@/components/Stats'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Stats />
      <Features />
      <Prices />
      <Footer />
    </>
  )
}
