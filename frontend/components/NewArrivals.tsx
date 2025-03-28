"use client";

import { useEffect, useState } from "react";
import { IProductWithReviews } from "@/interfaces";
import { fetchNewArrivals } from "@/lib/fetchData";
import ProductGrid from "@/components/ProductGrid";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface NewArrivalsProps {
    limit?: number;
}

export default function NewArrivals({limit} : NewArrivalsProps) {
    const [products, setProducts] = useState<IProductWithReviews[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNewArrivals()
            .then((data) => 
                setProducts(limit? data.slice(0, limit) :data)) // limit the number of products to display
            .catch((error) => console.error("Error fetching new arrivals:", error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading new arrivals...</p>;

    return (
        <section className="py-16 px-6 md:px-12 bg-gray-100">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold uppercase">New Arrivals</h2>
                    <Link href="/new-arrivals" className="text-sm flex items-center gap-2">
                        View all <ArrowRight size={16} />
                    </Link>
                </div>
                <ProductGrid products={products} />
            </div>
        </section>
    );
}
