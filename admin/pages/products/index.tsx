import Link from 'next/link'
import React from 'react'

function Products() {
  return (
    <div>
        <Link href={'/products/add-product'} className=' bg-green-600 p-2 px-4 rounded-lg text-white'>
            Add a Proudct
        </Link>
    </div>
  )
}

export default Products
