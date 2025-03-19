import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type Product = {
  _id: string;
  name: string;
  description?: string;
  price?: number;
}


function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('/api/products').then((res) => {
      setProducts(res.data);
    })
  }, []);
  // handles deleting a product
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/products?id=${id}`);
      setProducts(products.filter((product) => product._id !== id));
      alert("Product deleted successfully");
    } catch (error) {
      alert("Failed to delete product");
    }
  };

  return (
    <div className=''>
      <Link href={'/products/add-product'} className=' bg-green-600 p-2 px-4 rounded-lg text-white'>
        Add proudct
      </Link>

      <h2 className='text-3xl font-bold text-gray-600 text-center mt-8 underline'>List of products</h2>
      {/** get all the products */}
      <table className='mt-6 table-style'>
        <thead>
          <tr>
            <td>Product Name</td>
            <td></td>
            <td></td>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>
                <Link href={'/products/edit/'+product._id}
                      className='bg-green-600 p-1 px-2 inline-flex items-center gap-1 rounded-md text-white'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>
                  Edit
                </Link>
              </td>
              <td>
                <button onClick={() => handleDelete(product._id)}
                      className='bg-red-600 p-1 px-2 inline-flex items-center gap-1 cursor-pointer rounded-md text-white'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Products
