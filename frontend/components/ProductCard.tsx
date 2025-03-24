// components/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { IProduct } from "@/interfaces";

interface ProductCardProps {
  product: IProduct;
  // Optional: review aggregate information (if available)
  reviewAggregate?: {
    averageRating: number;
    reviewCount: number;
  };
}

export default function ProductCard({ product, reviewAggregate }: ProductCardProps) {
  // Use the first image from the images array or a placeholder
  const displayImage = product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg";
  const averageRating = reviewAggregate?.averageRating || 0;
  const reviewCount = reviewAggregate?.reviewCount || 0;

  return (
    <Link href={`/product/${product._id}`} className="group">
      <div className="relative aspect-square overflow-hidden bg-gray-100 mb-3 rounded-lg">
        <Image
          src={displayImage}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="space-y-1">
        <h3 className="font-medium text-sm">{product.name}</h3>
        <div className="flex items-center">
          <div className="flex mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({reviewCount})</span>
        </div>
        <div className="flex items-center justify-start">
          <p className="font-bold">${product.price}</p>
          {/* <span className="text-sm text-green-600">-40%</span> */}
        </div>
      </div>
    </Link>
  );
}
