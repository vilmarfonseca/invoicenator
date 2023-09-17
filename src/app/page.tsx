'use client'
import Features from '@/components/Sections/Features'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Sections/Hero'
import Prices from '@/components/Sections/Prices'
import Stats from '@/components/Sections/Stats'

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
