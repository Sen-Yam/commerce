import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'
const Product = ({product:{image,name,slug,price}}) => {
  return (
    <div>
        <Link href={`/product/${slug.current}`}> {/* /product/ is the folder where the the [slug] must be put 
        and we can access to the slug directly cuz it's put in pages folder , go to  success.js to understand more */}
        <div className='product-card'>
        <img src={urlFor(image[0])} alt='product-img' width={250} height={250} className='product-image' />
        <p className='product-name'>{name}</p>
        <p className='product-price'>{price}$</p>
        </div>
        </Link>
    </div>
  )
}

export default Product