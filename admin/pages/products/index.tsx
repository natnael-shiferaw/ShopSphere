import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Products() {
  const [products, setProducts] = useState([]);

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
    </div>
  )
}

export default Products
