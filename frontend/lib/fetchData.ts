import { IProduct, IReviewAggregate, IProductWithReviews } from "@/interfaces";

// fetch all products
export async function fetchProducts(): Promise<IProduct[]> {
    const res = await fetch("/api/products");
    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }
    return res.json();
}

// fetch the averageRating and reviewCount of a product by it's Id
export async function fetchReviewAggregate(productId: string): Promise<IReviewAggregate> {
    const res = await fetch(`/api/reviews?product=${productId}`);
    if (!res.ok) {
        throw new Error("Failed to fetch review aggregate");
    }
    const data = await res.json();
    return {
        averageRating: data.averageRating,
        reviewCount: data.reviewCount,
    };
}

//fetch all products with reviews merged in
export async function fetchProductsWithReviews(): Promise<IProductWithReviews[]> {
    const products : IProduct[] = await fetchProducts();

    const productsWithReviews = await Promise.all(
        products.map(async (product) => {
            try {
                const reviewAggregate = await fetchReviewAggregate(product._id);
                return {
                    ...product,
                    averageRating: reviewAggregate.averageRating,
                    reviewCount: reviewAggregate.reviewCount,
                } as IProductWithReviews
            } catch (error) {
                // if fetch review data fails, default to 0 values
                return {
                    ...product,
                    averageRating: 0,
                    reviewCount: 0
                } as IProductWithReviews
            }
        })
    )
    return productsWithReviews;
}

// fetch Newly added products
export async function fetchNewArrivals(): Promise<IProductWithReviews[]> {
    const products: IProductWithReviews[] = await fetchProductsWithReviews();
    // sort products by createdAt in descending order
    return products.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
}

//fetch Top selling products based on their ratings
export async function fetchTopSelling(): Promise<IProductWithReviews[]> {
    const products: IProductWithReviews[] = await fetchProductsWithReviews();
    // differentiate the products with reviews and without
    const withReviews = products.filter((product) => product.reviewCount > 0);
    const withoutReviews = products.filter((product) => product.reviewCount === 0);
    
    // sort the products with reviews by averageRating in descending order
    withReviews.sort((a,b) => b.averageRating - a.averageRating);
    // sort the products without reviews by reviewCount in descending order
    withoutReviews.sort(() => Math.random() - 0.5);
    return [...withReviews, ...withoutReviews]
}

// fetch products by dress style
export async function fetchByDressStyle(dressStyle: string): Promise<IProductWithReviews[]> {
    const products: IProductWithReviews[] = await fetchProductsWithReviews();
    return products.filter((product) => product.dressStyle.toLowerCase() === dressStyle.toLowerCase())
}

// filter products by category and dress style
export async function fetchByCategoryAndDressStyle(categories: string[], dressStyles: string[]): Promise<IProductWithReviews[]> {
    const products: IProductWithReviews[] = await fetchProductsWithReviews();
    return products.filter((product) =>
         categories.includes(product.category) && dressStyles.includes(product.dressStyle))
}
