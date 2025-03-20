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
  // // Set CORS headers
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // // Handle preflight OPTIONS request
  // if (req.method === "OPTIONS") {
  //   return res.status(200).end();
  // }

  await mongooseConnect();

  // delete product
  if (req.method === "DELETE") {
    const { id } = req.query;
    if (!id)
      return res.status(400).json({ error: "Product ID is required" });
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct)
        return res.status(404).json({ error: "Product not found" });
      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to delete product" });
    }
  }

  // get products or a single product
  if (req.method === "GET") {
    if(req.query?.id) {
      return res.json(await Product.findOne({_id: req.query.id}))
    } else {
      res.json(await Product.find({}));
    }
  }
  // create product
  if (req.method === "POST") {
    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: "File upload error" });
      console.log("Parsed fields:", fields);
      console.log("Parsed files:", files);

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

  //update the product
  if (req.method === "PUT") {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: "File upload error" });

      const _id = fields._id?.toString();
      const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
      const description = Array.isArray(fields.description)
        ? fields.description[0]
        : fields.description;
      const price = Array.isArray(fields.price) ? Number(fields.price[0]) : Number(fields.price);
      const category = Array.isArray(fields.category) ? fields.category[0] : fields.category;
      const dressStyle = Array.isArray(fields.dressStyle) ? fields.dressStyle[0] : fields.dressStyle;

      if (!_id) return res.status(400).json({ error: "Product ID is required" });

      // Handle existing images
      const existingImages = Array.isArray(fields.images)
        ? fields.images
        : fields.images
        ? [fields.images]
        : [];

      const newImageUrls: string[] = [];

      // Upload new images to Cloudinary if provided
      if (files.images) {
        const fileArray = Array.isArray(files.images) ? files.images : [files.images];
        for (const file of fileArray) {
          if (file && (file as any).filepath) {
            const filePath = (file as any).filepath;
            const imageUrl = await uploadImage(filePath);
            newImageUrls.push(imageUrl);
            fs.unlinkSync(filePath); // Remove temp file after upload
          }
        }
      }

      // Merge existing and new images
      const updatedImages = [...existingImages, ...newImageUrls];

      try {
        const updatedProduct = await Product.findByIdAndUpdate(
          _id,
          {
            name,
            description,
            price: Number(price), // Ensure it's a number
            category,
            dressStyle,
            images: updatedImages,
          },
          { new: true }
        );

        if (!updatedProduct) {
          return res.status(404).json({ error: "Product not found" });
        }

        return res.status(200).json(updatedProduct);
      } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return res.status(500).json({ error: "Database update failed", details: errMessage });
      }
    });
  }
  
};

export default handleProduct;
