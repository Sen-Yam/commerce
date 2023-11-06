import React,{useRef} from 'react'
import Link from 'next/link'
import { AiOutlineMinus,AiOutlinePlus,AiOutlineLeft,AiOutlineShopping } from 'react-icons/ai'
import {TiDeleteOutline} from 'react-icons/ti'
import  toast  from 'react-hot-toast'
import { useStateContext } from '../Context/StateContext'
import { urlFor } from '../lib/client'
import getStripe from '../lib/getStripe'
const Cart = () => {
  const cartRef=useRef();
  const {TotalPrice,TotalQuantities,cartItems,setshowCart,DecQty, IncQty,Qty,toggleCartItemQuantity, onRemove }=useStateContext()
 const HandleCheckout = async () => {
  const stripe = await getStripe();
  // get the stripe object using the public key and then sending the req and receiving the res
  const response = await fetch('/api/stripe' ,  {
    method: 'POST',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(cartItems)
  });
  if(response.statusCode==500) {return;}
  else {
    const data = await response.json();
    console.log(data)
    toast.loading('redirecting')
    stripe.redirectToCheckout({sessionId : data.id})
  }
  
 }
  return (
    <div className='cart-wrapper'ref={cartRef}>
      <div className='cart-container'>
      <button className='cart-heading' onClick={()=>{setshowCart(false)}}>
        <AiOutlineLeft style={{marginTop:'5px'}}/>
        <span className='heading'>your cart</span>
        <span className='cart-num-items'>( {TotalQuantities} items )</span>

      </button>
      {cartItems.length<1 && (
        <div className='empty-cart'>
          <AiOutlineShopping size={150} />
          <h3>Your shopping bag is empty </h3>
          <Link href="/" />
          <button
          className='btn'
           onClick={()=>{setshowCart(false)}}>
            Continue Shopping
          </button>
        </div>

      )}
      <div className='product-container'>
        {cartItems.length>0 &&  cartItems.map((product,index)=>
       (
            <div className='product' key={product._id}>
              <img src={urlFor(product.image[0])} className='cart-product-image' />
              <div className='item-desc'>
                <div className='flex top'>
                  <h3>{product.name}</h3>
                  <h4>${product.price}</h4>
                   </div>
                <div className='flex bottom'>
                  <div>
                    <p className='quantity-desc'>
                    <span className='minus'  onClick={()=>{toggleCartItemQuantity(product._id,'dec')}} ><  AiOutlineMinus/></span>
            <span className='num'>{product.quantity}</span>
            <span className='plus'  onClick={()=>{toggleCartItemQuantity(product._id,'inc')}} ><  AiOutlinePlus/></span>
                    </p>
                    </div>
                    <button className='remove-item' onClick={()=> onRemove(product)}>
                  <TiDeleteOutline />
                    </button>
                   </div>
                </div>
              </div>
        ))}

      </div>
      {cartItems.length>0 && (
        <div className='cart-bottom'>
          <div className='total'> 
          <h3>Subtotal :</h3>
          <h3>${TotalPrice}</h3>
          </div>
          <div className='btn-container'> 
          <button className='btn'
          onClick={()=>HandleCheckout()}
          >
          Pay with stripe
          </button>

          </div>
           </div>
      )}
      </div>
    </div>
  )
}

export default Cart