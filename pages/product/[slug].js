import React,{useState} from 'react'
import { urlFor } from '../../lib/client'
import { client } from '../../lib/client';
import {Product} from '../../components'
import { AiOutlineMinus,AiOutlinePlus,AiFillStar,AiOutlineStar } from 'react-icons/ai';
import { useStateContext } from '../../Context/StateContext';

const ProductDetails = ({ similarproducts, product }) => {
  const {name,image,details,price}=product
  const [index,setindex]=useState(0)
  const { DecQty, IncQty, Qty,onAdd ,setshowCart } = useStateContext();
 
  const HandleBuyNow =( product,Qty) => {
    setshowCart(true);
    onAdd(product,Qty)
  }


  return (
   <div>
  <div className='product-detail-container'>
<div className='product-images'>
  <div className='image-container'>
<img src={urlFor(image[index])} className='product-detail-image' />
  </div>
  <div className='small-images-container'>
    {image.map((img,i)=>(
      <img key={i} src={urlFor(img)} className='small-image'
       onMouseEnter={()=>setindex(i)} 
      />
    ))}
  </div>
  </div>
  <div className='product-detail-desc'>
      <h1>{name}</h1>
      <div className='reviews'>
        <div>
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiOutlineStar />
        </div>
        <p>(20)</p>
      </div>
      <div>
        <h4>Details: </h4>
        <p>{details}</p>
        <p className='price'>{price}$</p>
        <div className='quantity'>
          <h3> Quantity: </h3>
          <p className='quantity-desc'>
            <span className='minus' onClick={DecQty}><  AiOutlineMinus/></span>
            <span className='num'>{Qty}</span>
            <span className='plus' onClick={IncQty}><  AiOutlinePlus/></span>
          </p>
        </div>
        <div className='buttons'>
        <button className='add-to-cart' onClick={()=>onAdd(product,Qty)}>add to cart</button>
        <button className='buy-now' onClick={()=>HandleBuyNow(product,Qty)}>buy now</button>
        </div>
      </div>
   
  </div>

  </div>
  <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {similarproducts.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div>
      </div>
   
  )
}

export const getStaticPaths = async () => {
  // Fetch the paths for all products dynamically
  const products = await client.fetch('*[_type == "order"]');

  // Generate an array of paths with the required slug parameter
  const paths = products.map((product) => ({
    params: { slug: product.slug.current },
  }));

  return {
    paths,
    fallback: false, // or 'blocking' if you want to use incremental static regeneration
  };
};


export const getStaticProps = async ({params:{slug}}) => { /* slug is the id in the URL generated directly by nextJs  */
  const Productquery = `*[_type=="order" && slug.current=='${slug}'][0]`; // type=name in the schema
  const SimilarProducts='*[_type=="order"]'
  const product = await client.fetch(Productquery);
  
  
  const similarproducts = await client.fetch(SimilarProducts);
 
  
  return {
    props: { similarproducts, product }
  }
}

export default ProductDetails