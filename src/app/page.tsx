'use client'
import Features from '@/components/sections/Features'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/sections/Hero'
import Prices from '@/components/sections/Prices'
import Stats from '@/components/sections/Stats'

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
