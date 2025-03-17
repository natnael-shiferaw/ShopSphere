import ProductForm from "@/components/ProductForm";
import { ProductInfo } from "@/interfaces";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage() {
    const router = useRouter();
    const { id } = router.query;

    const [productInfo, setProductInfo] = useState<ProductInfo>()

    useEffect(() => {
        if (!id) return;

        axios.get(`/api/products?id=${id}`).then(res => {
            setProductInfo(res.data);
        })
    }, [id])


    return (
        <div className="flex flex-col gap-8">
            <h1>Edit Product Page</h1>
            {productInfo ? <ProductForm {...productInfo} /> : <p>Loading...</p>}
        </div>
    );
}
