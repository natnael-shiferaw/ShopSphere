// pages/product/[id].tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { Star, Minus, Plus } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";
import { IProductWithReviews } from "@/interfaces";
import { fetchProductsWithReviews } from "@/lib/fetchData";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<IProductWithReviews | null>(null);
  const [similarProducts, setSimilarProducts] = useState<IProductWithReviews[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    async function fetchData() {
      try {
        // Fetch all enriched products
        const products = await fetchProductsWithReviews();
        // Find the product with the given id
        const found = products.find((p) => p._id === id);
        if (!found) {
          console.error("Product not found");
          return;
        }
        setProduct(found);
        // Filter similar products by the same dressStyle, excluding the current product
        const similar = products.filter(
          (p) => p.dressStyle === found.dressStyle && p._id !== found._id
        );
        setSimilarProducts(similar);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }
    fetchData();
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const addToCart = () => {
    console.log("Adding to cart:", { product, quantity });
  };

  // Round the average rating for star display
  const roundedRating = Math.round(product.averageRating);

  return (
    <>
      <Head>
        <title>{product.name} | SHOPSPHERE</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images Section */}
          <div>
            <div className="relative w-full h-96 hover:cursor-pointer hover:scale-105 transition-transform duration-300">
              <Image
                src={product.images[selectedImageIndex] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover rounded-lg shadow-md shadow-gray-300"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    className={`relative w-20 h-20 border ${
                      selectedImageIndex === index ? "border-black" : "border-gray-300"
                    } cursor-pointer`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < roundedRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.reviewCount} Reviews)</span>
            </div>
            <div className="text-2xl font-bold">${product.price}</div>
            <p className="text-gray-600">{product.description}</p>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4 items-center">
              <div className="flex items-center border rounded">
                <button onClick={decrementQuantity} className="hover:cursor-pointer w-10 h-10 flex items-center justify-center">
                  <Minus size={16} />
                </button>
                <span className="w-10 h-10 flex items-center justify-center">{quantity}</span>
                <button onClick={incrementQuantity} className="hover:cursor-pointer w-10 h-10 flex items-center justify-center">
                  <Plus size={16} />
                </button>
              </div>
              <button onClick={addToCart} className="flex-1 bg-black text-white py-3 px-6 rounded-md hover:cursor-pointer">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="my-16">
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {similarProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      </div>

      <Newsletter />
    </>
  );
}
