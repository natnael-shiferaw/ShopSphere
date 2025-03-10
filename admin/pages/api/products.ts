import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/products";
import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinaryV2 } from "cloudinary";
import { IncomingForm } from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Disable bodyParser to handle form-data
  },
};

// Configure Cloudinary
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload Image Function
const uploadImage = async (filePath: string) => {
  const result = await cloudinaryV2.uploader.upload(filePath);
  return result.secure_url; // Cloudinary returns the image URL
};

// Handle API Requests
const handleProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  await mongooseConnect();

  if (req.method === "GET") {
    res.json(await Product.find({}));
  }

  if (req.method === "POST") {
    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: "File upload error" });

      // Convert fields to correct types
      const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
      const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
      const price = Array.isArray(fields.price) ? Number(fields.price[0]) : Number(fields.price);
      const category = Array.isArray(fields.category) ? fields.category[0] : fields.category;
      const dressStyle = Array.isArray(fields.dressStyle) ? fields.dressStyle[0] : fields.dressStyle;

      if (!name || !description || isNaN(price) || !category || !dressStyle) {
        return res.status(400).json({ error: "Invalid product data" });
      }

      const imageUrls: string[] = [];

      // Upload images to Cloudinary
      if (files.images) {
        const fileArray = Array.isArray(files.images) ? files.images : [files.images];
        for (const file of fileArray) {
          const filePath = (file as any).filepath;
          const imageUrl = await uploadImage(filePath);
          imageUrls.push(imageUrl);
          fs.unlinkSync(filePath); // Remove temp file after upload
        }
      }

      // Save Product with image URLs, category, and dressStyle
      const productDoc = await Product.create({
        name,
        description,
        price,
        images: imageUrls,
        category,
        dressStyle,
      });

      res.status(200).json(productDoc);
    });
  }
};

export default handleProduct;
