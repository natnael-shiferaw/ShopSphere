
// This interface represents the product data
export interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: "T-shirts" | "Shorts" | "Shirts" | "Hoodie" | "Jeans";
    dressStyle: "Casual" | "Formal" | "Party" | "Gym";
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}

// This interface represents the aggregated review info returned by /api/reviews?product=...
export interface IReviewAggregate {
    averageRating: number;
    reviewCount: number;
}
