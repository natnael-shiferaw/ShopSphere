import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ProductInfo } from "@/interfaces";

export default function ProductForm({
    _id,
    name: existingName,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
    category: existingCategory,
    dressStyle: existingDressStyle
}: Partial<ProductInfo>) {

    const [name, setName] = useState(existingName || "");
    const [description, setDescription] = useState(existingDescription || "");
    const [price, setPrice] = useState(existingPrice || "");
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [category, setCategory] = useState(existingCategory || "");
    const [dressStyle, setDressStyle] = useState(existingDressStyle || "");
    const [existingImagesState, setExistingImagesState] = useState<string[]>(existingImages || [])

    const router = useRouter();

    const categories = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
    const dressStyles = ["Casual", "Formal", "Party", "Gym"];

    // Handle Image Selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setImages(selectedFiles);
            setPreviewImages(selectedFiles.map((file) => URL.createObjectURL(file)));
        }
    };

    // Handle Form Submission
    async function saveProduct(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData();

        if (_id) {
            formData.append("_id", _id as string);
        }      
        formData.append("name", name.trim());
        formData.append("description", description.trim());
        formData.append("price", String(price));
        formData.append("category", category);
        formData.append("dressStyle", dressStyle);

        // Append existing images as text fields so they can be merged server-side.
        existingImagesState.forEach((img) => formData.append("images", img));

        // Append new images as file fields
        images.forEach((image) => formData.append("images", image));

        if (_id) {
            // update the product details
            try {
                const res = await axios.put("/api/products", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                if (res.status === 200) {
                    alert("Product updated successfully");
                    router.push("/products");
                }
            } catch (error: any) {
                console.error("Error updating product:", error);
                alert(error.response?.data?.error || "Error updating product");
            }
        } else {
            // create new product
            await axios.post("/api/products", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            router.push("/products");
        }
    }
    // function to remove existing images
    const removeExistingImage = (index: number) => {
        setExistingImagesState(existingImagesState.filter((_, i) => i !== index));
    }
    // function to remove the newly uploaded images
    const removePreviewImage = (index: number) => {
        setPreviewImages(previewImages.filter((_, i) => i !== index));
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <div>
            <form onSubmit={saveProduct} 
                  className="space-y-4 border-2 border-gray-300 p-4 mr-12 rounded-lg bg-slate-50">
                <label>Product Name</label>
                <input type="text" placeholder="Product name" onChange={(e) => setName(e.target.value)} value={name} />

                <label>Product Description</label>
                <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description} />

                <label>Price</label>
                <input type="number" placeholder="Price in USD" onChange={(e) => setPrice(e.target.value)} value={price} />
                {/**categories */}
                <div className="flex gap-4 items-center mt-4">
                    <label>Category</label>
                    <select onChange={(e) => setCategory(e.target.value)} value={category} required
                        className="bg-gray-200 h-10 p-2 border border-gray-400 rounded">
                        <option value="" disabled>Select category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                {/**Dress Style */}
                <div className="flex gap-4 items-center mt-4">
                    <label>Dress Style</label>
                    <select onChange={(e) => setDressStyle(e.target.value)} value={dressStyle} required
                        className="bg-gray-200 h-10 p-2 border border-gray-400 rounded">
                        <option value="" disabled>Select dress style</option>
                        {dressStyles.map((style) => (
                            <option key={style} value={style}>{style}</option>
                        ))}
                    </select>
                </div>


                <label>Upload Images</label>
                <label className="mt-4 w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100 relative overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                    </svg>
                    <span className="text-md text-gray-500 cursor-pointer">Upload</span>

                    {/* Hidden File Input */}
                    <input type="file" multiple onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </label>

                {/**existing images */}
                <div className="flex gap-4 mt-2">
                    {existingImagesState.map((image, index) => (
                        <div className="relative">
                            <img key={index} src={image} alt="existing images"
                                className="w-20 h-20 object-cover rounded" />
                            <button onClick={() => removeExistingImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white text-sm rounded-full p-1 hover:cursor-pointer">X</button>
                        </div>

                    ))}
                </div>

                {/* Show Preview images */}
                <div className="flex gap-4 mt-2">
                    {previewImages.map((image, index) => (
                        <div className="relative">
                            <img key={index} src={image} alt="Preview" className="w-20 h-20 object-cover rounded" />
                            <button onClick={() => removePreviewImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white text-sm rounded-full p-1 hover:cursor-pointer">X</button>
                        </div>
                    ))}
                </div>

                <button type="submit" className="bg-blue-900 text-white p-2 px-4 rounded-lg hover:cursor-pointer">
                    Save
                </button>
            </form>
        </div>
    )
}
