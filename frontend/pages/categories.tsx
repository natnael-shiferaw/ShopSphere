"use client"

import { useState } from "react"
import Head from "next/head"
import ProductGrid from "@/components/product-grid"
import CategoryFilter from "@/components/category-filter"
import PriceFilter from "@/components/price-filter"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import DressStyleFilter from "@/components/dress-style-filter"
import Newsletter from "@/components/Newsletter"

export default function Categories() {
  const [showFilters, setShowFilters] = useState(false)

  const products = [
    {
      id: 1,
      name: "T-shirt with Tape Details",
      price: 120,
      image: "/placeholder.svg?height=300&width=300",
      category: "T-shirts",
    },
    { id: 2, name: "Skinny Fit Jeans", price: 240, image: "/placeholder.svg?height=300&width=300", category: "Jeans" },
    { id: 3, name: "Checkered Shirt", price: 180, image: "/placeholder.svg?height=300&width=300", category: "Shirts" },
    {
      id: 4,
      name: "Sleeve Striped T-shirt",
      price: 130,
      image: "/placeholder.svg?height=300&width=300",
      category: "T-shirts",
    },
    {
      id: 5,
      name: "Vertical Striped Shirt",
      price: 212,
      image: "/placeholder.svg?height=300&width=300",
      category: "Shirts",
    },
    {
      id: 6,
      name: "Courage Graphic T-shirt",
      price: 145,
      image: "/placeholder.svg?height=300&width=300",
      category: "T-shirts",
    },
    // Add more products as needed
  ]

  return (
    <>
      <Head>
        <title>Categories | SHOPSPHERE</title>
        <meta name="description" content="Browse our product categories" />
      </Head>

      <div className="max-w-7xl mx-auto mb-12 px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Categories</h1>
          <div className="flex items-center gap-4">
            <p className="text-xs text-gray-500">Sort by:</p>
            <Button variant="outline" className="hidden md:flex">
              Most popular
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="md:hidden" onClick={() => setShowFilters(!showFilters)}>
              Filters
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className={`w-full md:w-1/4 bg-gray-200 p-4 rounded-lg ${showFilters ? "block" : "hidden md:block"}`}>
            <CategoryFilter />
            <PriceFilter />
            <DressStyleFilter />
            <Button className="bg-black text-white rounded-lg px-8">Apply Filter</Button>
          </div>

          <div className="w-full md:w-3/4">
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
      <Newsletter />
    </>
  )
}

