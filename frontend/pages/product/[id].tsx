"use client"

import { useState } from "react"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Star } from "lucide-react"
import Newsletter from "@/components/Newsletter"

export default function ProductDetail() {
  const router = useRouter()
  const { id } = router.query

  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState("olive")
  const [selectedSize, setSelectedSize] = useState("M")

  const product = {
    id: 1,
    name: "One Life Graphic T-shirt",
    price: 20,
    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers both comfort and style.",
    colors: ["olive", "black", "green"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.5,
    reviews: 150,
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
  }

  const relatedProducts = [
    {
      id: 2,
      name: "Blue Cotton Tee",
      price: 25,
      image: "/placeholder.svg?height=200&width=200",
      category: "T-shirts",
    },
    {
      id: 3,
      name: "Elephant Graphic T-shirt",
      price: 22,
      image: "/placeholder.svg?height=200&width=200",
      category: "T-shirts",
    },
    {
      id: 4,
      name: "Pink Tie-Dye Tee",
      price: 28,
      image: "/placeholder.svg?height=200&width=200",
      category: "T-shirts",
    },
    {
      id: 5,
      name: "Black Striped T-shirt",
      price: 24,
      image: "/placeholder.svg?height=200&width=200",
      category: "T-shirts",
    },
  ]

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const addToCart = () => {
    console.log("Added to cart:", {
      product,
      quantity,
      color: selectedColor,
      size: selectedSize,
    })
    // Here you would typically dispatch to a cart state manager
  }

  return (
    <>
      <Head>
        <title>{product.name} | SHOPSPHERE</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative">
              <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
            <div className="flex gap-2">
              {product.images.slice(1).map((image, index) => (
                <div key={index} className="w-1/3 aspect-square relative border">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>

            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.reviews} Reviews)</span>
            </div>

            <div className="text-2xl font-bold">${product.price}</div>

            <p className="text-gray-600">{product.description}</p>

            <div className="space-y-4">

              <div className="flex gap-4 items-center">
                <div className="flex items-center border">
                  <button onClick={decrementQuantity} className="w-10 h-10 flex items-center justify-center">
                    <Minus size={16} />
                  </button>
                  <span className="w-10 h-10 flex items-center justify-center">{quantity}</span>
                  <button onClick={incrementQuantity} className="w-10 h-10 flex items-center justify-center">
                    <Plus size={16} />
                  </button>
                </div>

                <Button onClick={addToCart} className="flex-1 bg-black text-white hover:bg-gray-800 rounded-none">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* You might also like */}
        <div className="my-16">
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <Newsletter />
      </div>
    </>
  )
}

