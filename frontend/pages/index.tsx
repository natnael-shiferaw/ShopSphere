"use client"

import Head from "next/head"
import Newsletter from "@/components/Newsletter"
import HeroSection from "@/components/HeroSection"
import NewArrivals from "@/components/NewArrivals"
import TopSelling from "@/components/TopSelling"
import useProductLimit from "@/hooks/useProductLimit"
import CustomerReviews from "@/components/CustomerReviews"
import DressStyles from "@/components/DressStyles"

export default function Home() {
  const limit: number = useProductLimit();

  return (
    <>
      <Head>
        <title>SHOPSPHERE - Find Clothes That Match Your Style</title>
        <meta name="description" content="Shop the latest fashion trends at SHOPSPHERE" />
      </Head>

      {/* Hero Section */}
      <HeroSection />

      {/* New Arrivals Section */}
      <NewArrivals limit={limit} />

      {/* Top Selling Section */}
      <TopSelling limit={limit} />

      {/* Browse By Style Section */}
      <DressStyles />

      {/* Happy Customers Section */}
      <CustomerReviews />

      {/* Newsletter Section */}
      <Newsletter />

    </>
  )
}

