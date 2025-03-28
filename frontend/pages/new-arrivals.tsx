"use client";

import { useEffect, useState } from "react";
import { IProductWithReviews } from "@/interfaces";
import { fetchNewArrivals } from "@/lib/fetchData";
import ProductGrid from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 8; // Change as needed

export default function NewArrivalsPage() {
  const [products, setProducts] = useState<IProductWithReviews[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchNewArrivals()
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching new arrivals:", error))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentProducts = products.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="py-16 px-6 md:px-12 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">New Arrivals</h1>
        {loading ? (
          <p>Loading new arrivals...</p>
        ) : (
          <>
            <ProductGrid products={currentProducts} />
            <div className="flex justify-center items-center mt-12 gap-4 bg-gray-50 p-2 rounded">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="bg-gray-200 hover:cursor-pointer hover:bg-gray-400"
              >
                Previous
              </Button>
              <span className="text-gray-800">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="bg-gray-200 hover:cursor-pointer hover:bg-gray-400"
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
