"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import ProductGrid from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { fetchByDressStyle } from "@/lib/fetchData";
import { IProductWithReviews } from "@/interfaces";

const PAGE_SIZE = 8;

export default function DressStylePage() {
  const router = useRouter();
  const { style } = router.query;
  const [products, setProducts] = useState<IProductWithReviews[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!style || typeof style !== "string") return;
    fetchByDressStyle(style)
      .then((data) => setProducts(data))
      .catch((error) =>
        console.error("Error fetching products by dress style:", error)
      )
      .finally(() => setLoading(false));
  }, [style]);

  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentProducts = products.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <>
      <Head>
        <title>{(style as string).toUpperCase()} Products | SHOPSPHERE</title>
        <meta
          name="description"
          content={`Browse ${style} products at SHOPSPHERE`}
        />
      </Head>
      <div className="py-16 px-6 md:px-12 bg-white min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            {(style as string).toUpperCase()} Products
          </h1>
          {loading ? (
            <p>Loading products...</p>
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
    </>
  );
}
