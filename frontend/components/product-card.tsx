import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group">
      <div className="relative aspect-square overflow-hidden bg-gray-100 mb-3 rounded-lg">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="space-y-1">
        <h3 className="font-medium text-sm">{product.name}</h3>
        <div className="flex items-center">
          <div className="flex mr-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <span className="text-xs text-gray-500">(121)</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-bold">${product.price}</p>
          <span className="text-sm text-green-600">-40%</span>
        </div>
      </div>
    </Link>
  )
}
