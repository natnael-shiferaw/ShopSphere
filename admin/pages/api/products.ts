import clientPromise from "@/lib/db";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/products";
import { NextApiRequest, NextApiResponse } from "next";

const handleProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  //create connection with mongodb
  await mongooseConnect();

  // Get products
  if(req.method === 'GET'){
    res.json(await Product.find({}));
  }

  // Handle add Product
  if (req.method === "POST") {
    const {name, description, price} = req.body;
    const productDoc = await Product.create({name, description, price});

    res.status(200).json(productDoc);
  }
};

export default handleProduct;
