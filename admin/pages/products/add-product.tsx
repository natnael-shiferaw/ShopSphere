import axios from 'axios'
import React, { useState } from 'react'

function AddProduct() {
  const [productName, setProudctName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [price, setPrice] = useState('')

  async function createProduct(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = {productName, productDescription, price};
    await axios.post('/api/products', data);
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
            onChange={(e) => setProudctName(e.target.value)}
            value={productName} 
          />

          <label>Product Description</label>
          <textarea 
            placeholder='description'
            onChange={(e) => setProductDescription(e.target.value)}
            value={productDescription} 
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
