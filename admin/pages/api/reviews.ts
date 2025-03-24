import { mongooseConnect } from "@/lib/mongoose";
import { Review } from "@/models/reviews";
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await mongooseConnect();

  if (req.method === "POST") {
    try {
      const { product, name, rating, comment } = req.body;
      // Basic validation
      if (!product || !name || !rating) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const review = await Review.create({ product, name, rating, comment });
      return res.status(201).json(review);
    } catch (error) {
      console.error("Error creating review:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    try {
      const { product } = req.query;
      if (product) {
        // Convert product to an ObjectId for aggregation
        const productId = new mongoose.Types.ObjectId(product as string);

        // Get all reviews for this product
        const reviews = await Review.find({ product: productId });

        // Use aggregation to compute average rating and count
        const aggregation = await Review.aggregate([
          { $match: { product: productId } },
          {
            $group: {
              _id: "$product",
              averageRating: { $avg: "$rating" },
              reviewCount: { $sum: 1 },
            },
          },
        ]);

        const averageRating = aggregation.length ? aggregation[0].averageRating : 0;
        const reviewCount = aggregation.length ? aggregation[0].reviewCount : 0;

        return res.status(200).json({ reviews, averageRating, reviewCount });
      } else {
        // If no product filter is provided, return all reviews.
        const reviews = await Review.find({});
        return res.status(200).json(reviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
