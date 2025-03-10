"use client"

import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Plus } from "lucide-react"
import Newsletter from "@/components/Newsletter"
import HeroSection from "@/components/HeroSection"

export default function Home() {
  const newArrivals = [
    {
      id: 1,
      name: "One Life Graphic Tee",
      price: 20,
      image: "/placeholder.svg?height=300&width=300",
      category: "T-shirts",
    },
    {
      id: 2,
      name: "Skinny Fit Jeans",
      price: 40,
      image: "/placeholder.svg?height=300&width=300",
      category: "Jeans",
    },
    {
      id: 3,
      name: "Checkered Shirt",
      price: 35,
      image: "/placeholder.svg?height=300&width=300",
      category: "Shirts",
    },
    {
      id: 4,
      name: "Retro Striped T-shirt",
      price: 25,
      image: "/placeholder.svg?height=300&width=300",
      category: "T-shirts",
    },
  ]

  const topSelling = [
    {
      id: 5,
      name: "Vintage Denim Shirt",
      price: 45,
      image: "/placeholder.svg?height=300&width=300",
      category: "Shirts",
    },
    {
      id: 6,
      name: "Orange Graphic Tee",
      price: 20,
      image: "/placeholder.svg?height=300&width=300",
      category: "T-shirts",
    },
    {
      id: 7,
      name: "Loose Fit Bermuda Shorts",
      price: 30,
      image: "/placeholder.svg?height=300&width=300",
      category: "Shorts",
    },
    {
      id: 8,
      name: "Plaid Flannel Jeans",
      price: 50,
      image: "/placeholder.svg?height=300&width=300",
      category: "Jeans",
    },
  ]

  const dressStyles = [
    { id: 1, name: "Casual", image: "/placeholder.svg?height=150&width=150" },
    { id: 2, name: "Formal", image: "/placeholder.svg?height=150&width=150" },
    { id: 3, name: "Party", image: "/placeholder.svg?height=150&width=150" },
    { id: 4, name: "Gym", image: "/placeholder.svg?height=150&width=150" },
  ]

  const customerReviews = [
    {
      id: 1,
      name: "John D.",
      rating: 5,
      comment: "Great quality products and fast shipping. Will definitely shop here again!",
    },
    {
      id: 2,
      name: "Sarah M.",
      rating: 4,
      comment: "Love the variety of styles. The fit is perfect and the material is comfortable.",
    },
    {
      id: 3,
      name: "Michael T.",
      rating: 5,
      comment: "Excellent customer service and the clothes are exactly as described. Very satisfied!",
    },
  ]

  return (
    <>
      <Head>
        <title>SHOPSPHERE - Find Clothes That Match Your Style</title>
        <meta name="description" content="Shop the latest fashion trends at SHOPSPHERE" />
      </Head>

      {/* Hero Section */}
      <HeroSection />

      {/* New Arrivals Section */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold uppercase">NEW ARRIVALS</h2>
            <Link href="/new-arrivals" className="text-sm flex items-center gap-2">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Selling Section */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold uppercase">top selling</h2>
            <Link href="/top-selling" className="text-sm flex items-center gap-2">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topSelling.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Browse By Style Section */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold uppercase mb-8">BROWSE BY dress STYLE</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dressStyles.map((style) => (
              <Link href={`/style/${style.name.toLowerCase()}`} key={style.id} className="group">
                <div className="relative overflow-hidden bg-gray-100 aspect-square">
                  <Image
                    src={style.image || "/placeholder.svg"}
                    alt={style.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-end p-4">
                    <p className="text-lg font-medium bg-white/80 px-3 py-1">{style.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Happy Customers Section */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold uppercase">OUR HAPPY CUSTOMERS</h2>
            <button className="text-sm">
              <Plus size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerReviews.map((review) => (
              <div key={review.id} className="bg-white p-6 shadow-sm">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"}>
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm mb-4">{review.comment}</p>
                <p className="text-sm font-medium">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

    </>
  )
}

