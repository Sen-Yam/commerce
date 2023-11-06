import React from 'react'
import Link from 'next/link'
import {AiOutlineShopping} from 'react-icons/ai'
import {Cart} from './'
import { useStateContext } from '../Context/StateContext'
const NavBar = () => {
  const {showCart,setshowCart,TotalQuantities}=useStateContext()
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>
      Tech Accessories Store
        </Link>
      </p>
      <button className='cart-icon' onClick={()=>setshowCart(true)}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>
        {TotalQuantities}
        </span>
      </button>
      {showCart && <Cart />}

    </div>
  )
}

export default NavBar