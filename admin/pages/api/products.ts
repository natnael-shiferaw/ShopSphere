import { NextApiRequest, NextApiResponse } from "next";

const createProduct = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // Handle POST request
    res.status(200).json({ message: "Product created" });
  } else {
    // Handle other HTTP methods
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default createProduct;
