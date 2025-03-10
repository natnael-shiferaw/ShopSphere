"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import ProductGrid from "@/components/product-grid";
import CategoryFilter from "@/components/category-filter";
import PriceFilter from "@/components/price-filter";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import DressStyleFilter from "@/components/dress-style-filter";
import Newsletter from "@/components/Newsletter";

export default function Categories() {
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        const data = await res.json();

        // Transform data to match frontend structure
        const formattedProducts = data.map((product: any) => ({
          id: product._id, // Convert _id to id
          name: product.name,
          price: product.price,
          image: product.images?.[0] || "/placeholder.svg", // Take the first image
          category: product.category,
        }));

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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
  );
}
