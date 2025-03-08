import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const router = useRouter();

  // Handle Image Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages(selectedFiles);
      setPreviewImages(selectedFiles.map(file => URL.createObjectURL(file)));
    }
  };

  // Handle Form Submission
  async function createProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name.trim());
    formData.append("description", description.trim());
    formData.append("price", String(price));

    images.forEach((image) => formData.append("images", image));

    await axios.post("/api/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    router.push("/products");
  }

  return (
    <>
      <div className="flex flex-col gap-8">
        <h1>Add a new Product</h1>

        <form onSubmit={createProduct} className="space-y-4">
          <label>Product name</label>
          <input type="text" placeholder="product name" onChange={(e) => setName(e.target.value)} value={name} />

          <label>Product Description</label>
          <textarea placeholder="description" onChange={(e) => setDescription(e.target.value)} value={description} />

          <label>Price</label>
          <input type="number" placeholder="price in USD" onChange={(e) => setPrice(e.target.value)} value={price} />

          <label>Upload Images</label>
          <label className="mt-4 w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100 relative overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
            </svg>
            <span className="text-md text-gray-500 cursor-pointer">Upload</span>

            {/* Hidden File Input */}
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </label>


          {/* Show Preview */}
          <div className="flex gap-4 mt-2">
            {previewImages.map((image, index) => (
              <img key={index} src={image} alt="Preview" className="w-20 h-20 object-cover rounded" />
            ))}
          </div>

          <button type="submit" className="bg-blue-900 text-white p-2 px-4 mt-4 rounded-lg hover:cursor-pointer">
            Save
          </button>
        </form>
      </div>
    </>
  );
}

export default AddProduct;
