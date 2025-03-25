// components/ProductGrid.tsx
import { IProductWithReviews } from "@/interfaces";
import ProductCard from "@/components/ProductCard";

interface ProductGridProps {
  products: IProductWithReviews[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
    </div>
  );
}
