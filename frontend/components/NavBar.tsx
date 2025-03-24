"use client"

import Link from "next/link"
import { Search, ShoppingBag, User } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [searchValue, setSearchValue] = useState("")

  return (
    <header className="sticky top-0 bg-white z-50 border-b border-gray-200 py-4 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight">
          SHOPSPHERE
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/categories" className="text-sm font-medium text-gray-700">
            Categories
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for products..."
              className="pl-10 pr-4 py-2 bg-[#f0f0f0] rounded-full text-sm  focus:outline-none"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          <Link href="/cart" className="p-2">
            <img src="/cart.svg" alt="Cart" className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Link>

          <Link href="/account" className="p-2">
            <img src="/user.svg" alt="User" className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

