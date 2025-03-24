import {IProduct, IReviewAggregate} from "@/interfaces/index"

// fetch all products
export async function fetchProducts(): Promise<IProduct[]> {
    const res = await fetch("/api/products");
    if(!res.ok) {
        throw new Error("failed to fetch Products.")
    }
    return res.json();
}

//fetch Newly Arrived products
export async function fetchNewArrivals(): Promise<IProduct[]> {
    const res = await fetch("/api/products");
    if(!res.ok) {
        throw new Error("failed to fetch Products")
    }

    const products: IProduct[] = await res.json()
    return products.sort(
        (a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
}

// fetch Review Aggregate to get averageRating and reviewCount of a Product
export async function fetchReviewAggregate(productId: string):Promise<IReviewAggregate> {
    const res = await fetch(`/api/reviews?product=${productId}`);
    if(!res.ok) {
        throw new Error("failed to fetch Review Aggregate")
    }
    const data = await res.json();
    return {
        averageRating: data.averageRating,
        reviewCount: data.reviewCount,
    }
}

// fetch top selling products based on their ratings
export async function fetchTopSelling(): Promise<(IProduct & IReviewAggregate)[]> {
    const res = await fetch("/api/products");
    if(!res.ok) {
        throw new Error("failed to fetch Products")
    }
    const products: IProduct[] = await res.json()

    const productsWithReviews = await Promise.all(
        products.map(async (product) => {
            try {
                // fetch the review aggregate for each product
                const reviewAggregate = await fetchReviewAggregate(product._id);
                return {
                    ...product,
                    averageRating: reviewAggregate.averageRating,
                    reviewCount: reviewAggregate.reviewCount,
                }
            } catch (error) {
                // if no ratings are found or error occurs set to default values
                return {...product, averageRating:0, reviewCount:0}
            }
        })
    )
    // differentiate products with reviews from those without
    const withReviews = productsWithReviews.filter((product) => product.reviewCount >0)
    const withoutReviews = productsWithReviews.filter((product) => product.reviewCount === 0)
    
    // sort the products with reviews by their average rating in descending order
    withReviews.sort((a,b) => b.averageRating - a.averageRating)
    // sort products without reviews randomly
    withoutReviews.sort(() => Math.random() - 0.5);

    return [...withReviews, ...withoutReviews];
}

// fetch products by Dress Style
export async function fetchByDressStyle(dressStyle: string): Promise<IProduct[]> {
    const res = await fetch("/api/products");
    if(!res.ok) {
        throw new Error("failed to fetch Products")
    }
    const products: IProduct[] = await res.json();

    return products.filter((product) => product.dressStyle.toLowerCase() === dressStyle.toLowerCase())
}

// filter products by category and dressStyle
export async function fetchByCategoryAndDressStyle(categories: string[], dressStyles: string[]): Promise<IProduct[]> {
    const res = await fetch("/api/products");
    if(!res.ok) {
        throw new Error("failed to fetch Products");
    }
    const products: IProduct[] = await res.json();
    return products.filter((product) => (
                           categories.includes(product.category) && dressStyles.includes(product.dressStyle) ))
}
