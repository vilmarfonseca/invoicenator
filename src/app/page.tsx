"use client";
import Features from "@/components/Sections/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Sections/Hero";
import Prices from "@/components/Sections/Prices";
import Customers from "@/components/Sections/Customers";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Customers />
      <Features />
      <Prices />
      <Footer />
    </>
  );
}
