"use client"

import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Minus, Plus, X } from "lucide-react"
import { useState } from "react"
import Newsletter from "@/components/Newsletter"

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Elephant Graphic T-shirt",
      price: 22,
      quantity: 1,
      size: "M",
      color: "Pink",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Checkered Shirt",
      price: 35,
      quantity: 1,
      size: "L",
      color: "Red",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Skinny Fit Jeans",
      price: 40,
      quantity: 1,
      size: "32",
      color: "Blue",
      image: "/placeholder.svg?height=100&width=100",
    },
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 15
  const total = subtotal + shipping

  return (
    <>
      <Head>
        <title>Your Cart | SHOPSPHERE</title>
        <meta name="description" content="View and manage your shopping cart" />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cartItems.length > 0 ? (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b pb-6">
                    <div className="w-24 h-24 relative flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>

                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-gray-600">
                          <X size={16} />
                        </button>
                      </div>

                      <div className="text-sm text-gray-500 mt-1">
                        Size: {item.size} | Color: {item.color}
                      </div>

                      <div className="mt-auto flex justify-between items-center">
                        <div className="flex items-center border">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 h-8 flex items-center justify-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <div className="font-medium">${item.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl mb-4">Your cart is empty</p>
                <Link href="/">
                  <Button className="bg-black text-white hover:bg-gray-800 rounded-none">Continue Shopping</Button>
                </Link>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="border p-6 space-y-6">
              <h2 className="text-xl font-bold">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-none">Proceed to Checkout</Button>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <Newsletter />
      </div>
    </>
  )
}
