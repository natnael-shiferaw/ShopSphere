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
  

  return (
    <div>
        <Link href={'/products/add-product'} className=' bg-green-600 p-2 px-4 rounded-lg text-white'>
            Add a Proudct
        </Link>
        {/** get all the products */}
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th></th>
            </tr>
          </thead>

          <tbody> 
          {products.map((product) => (
          <tr key={product._id}>
            <td>{product.name}</td>
            <td>button</td>
          </tr>
        ))}
          </tbody>
        </table>
        
    </div>
  )
}

export default Products
