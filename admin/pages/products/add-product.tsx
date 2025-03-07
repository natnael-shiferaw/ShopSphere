import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState} from 'react'

function AddProduct() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const router = useRouter();

  async function createProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = { name, description, price };
    await axios.post('/api/products', data);
    
    router.push('/products');
  }

  return (
    <>
      <div className='flex flex-col gap-8'>
        <h1>Add a new Product</h1>

        <form onSubmit={createProduct} className='space-y-4'>
          <label>Product name</label>
          <input
            type="text"
            placeholder='product name'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <label>Product Description</label>
          <textarea
            placeholder='description'
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />

          <label>Price</label>
          <input
            type="number"
            placeholder='price in USD'
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />

          <button
            type="submit"
            className='bg-blue-900 text-white p-2 px-4 mt-4 rounded-lg hover:cursor-pointer'
          >
            Save
          </button>
        </form>
      </div>
    </>
  )
}

export default AddProduct
