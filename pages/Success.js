/* All components in pages folder are redirected automatically from the localhost 3000
localhost:3000/success will redirect us to this page automatically without putting the route in appjs
sane thing with the [slug] when we specified the slug current in the Product.jsx and we r redirecting to slug cuz it's
in pages folder

*/



import React ,{useState, useEffect} from 'react'
import Link from 'next/link'
import {BsBagCheckFill} from 'react-icons/bs'
import { useStateContext } from '../Context/StateContext'
import { runFireworks } from '../lib/utils'
const Success = () => {
  const {setTotalQuantities,setTotalPrice,setcartItems}= useStateContext();
 
  useEffect(()=>{
localStorage.clear();
setcartItems([]);
setTotalPrice(0);
setTotalQuantities(0);
runFireworks()
  },[])
  return (
    <div className='success-wrapper'>
      <div className='success'>
        <p className='icon'>
      <BsBagCheckFill/>
        </p>
        <h2>Thank you for your order !</h2>
        <p className='email-msg'>Check your email inbox for the receip.</p>
        <p className='description'>
          If you have any question please email 
          <a className='email' href='mailto:yamina15mina@gmail.com'>yamina15mina@gmail.com</a>
        </p>
        <Link href="/"> {/*   href=/ to return to the home page when clicking in the button continue shopping */}
          <button type='button' width="300px" className='btn'>
      Continue shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success