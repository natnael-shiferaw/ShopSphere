"use client";

import { useEffect, useState } from "react";
import { IProductWithReviews } from "@/interfaces";
import { fetchTopSelling } from "@/lib/fetchData";
import ProductGrid from "@/components/ProductGrid";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface TopSellingProps {
    limit?: number;
}

export default function TopSelling({limit} : TopSellingProps) {
    const [products, setProducts] = useState<IProductWithReviews[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTopSelling()
            .then((data) => 
                setProducts(limit? data.slice(0, limit) :data)) // limit the number of products to display
            .catch((error) => console.error("Error fetching top selling:", error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading top selling...</p>;

    return (
        <section className="py-16 px-6 md:px-12 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold uppercase">Top Selling</h2>
                    <Link href="/top-selling" className="text-sm flex items-center gap-2">
                        View all <ArrowRight size={16} />
                    </Link>
                </div>
                <ProductGrid products={products} />
            </div>
        </section>
    );
}
