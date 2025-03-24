// components/ProductGrid.tsx
import { IProduct } from "@/interfaces";
import ProductCard from "@/components/ProductCard";

interface ProductGridProps {
  products: IProduct[];
  // Optionally pass review aggregates keyed by product _id
  reviews?: Record<string, { averageRating: number; reviewCount: number }>;
}

export default function ProductGrid({ products, reviews }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          reviewAggregate={reviews ? reviews[product._id] : undefined}
        />
      ))}
    </div>
  );
}
