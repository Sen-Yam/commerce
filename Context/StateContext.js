import React,{createContext,useContext,useState,useEffect} from "react";
import {toast} from 'react-hot-toast'

const Context=createContext()


export const StateContext = ({children}) => {
  let foundProduct;
  let index;
  let newCartItems;
    const [showCart,setshowCart]=useState(false)
    const [cartItems, setcartItems] = useState([])
    const [TotalQuantities, setTotalQuantities] = useState(0)
    const [TotalPrice, setTotalPrice] = useState(0)
    const [Qty, setQty] = useState(1)

    const IncQty=()=>{
      setQty((prv)=>prv+1)
    }
    const DecQty=()=>{
      
      setQty((prv)=>{
        if(prv==1) {return 1}
        return prv-1})
    }
    const toggleCartItemQuantity = (id,value) =>{
     
      foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id);
     newCartItems = [...cartItems]
/* in this function we cannot do a map to find the siliar id and then modify it it retrurns 
an error cuz the slug modifies the cart and cart.jsx does it too */

    
    if(value == 'inc') {
      newCartItems[index].quantity+=1;
      setcartItems([...newCartItems]);
      setTotalPrice((prevTotalPrice) =>Math.round(prevTotalPrice + foundProduct.price ))
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
      console.log(TotalQuantities)
    } else if(value == 'dec') {
      if (foundProduct.quantity > 1) {
        newCartItems[index].quantity-=1;
        setcartItems([...newCartItems]);
        setTotalPrice((prevTotalPrice) => Math.round(prevTotalPrice -foundProduct.price))
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
      }
    }
    console.log(TotalQuantities)
    }
    const onAdd=(prd,qty)=>{
      
      const foundProduct = cartItems.find((item) => item && item._id === prd._id);
      index = cartItems.findIndex((product) => product._id === prd._id);
      let newCartItems = [...cartItems];
      if(foundProduct) {

        newCartItems[index].quantity+=qty;
      
       
      }
      else {
        prd.quantity=qty;
 /*product(order) in schema doesn't have the attribute quantity, but when we r putting prd.quantity we r creating this attribute */
    newCartItems.push(prd)   
 setcartItems(newCartItems)
      }
      
      setTotalPrice((prv)=> Math.round(prv+ prd.price*qty));
        setTotalQuantities((prv)=>prv+qty);
     
      toast.success(`${qty} ${prd.name} added to the cart`) /* Alert mssg */
    }
    const onRemove = (prd) =>{
     
       newCartItems = cartItems.filter((item, index) => item._id !== prd._id);
       setcartItems([...newCartItems])
       setTotalQuantities((prv)=>prv-prd.quantity);
       setTotalPrice((prv)=> Math.round(prv-prd.quantity*prd.price))
       console.log(TotalQuantities)
    }
  return (
    <Context.Provider /* ==Context */
  value={{showCart,cartItems,TotalPrice,TotalQuantities,Qty,IncQty,DecQty,onAdd,
      setshowCart, toggleCartItemQuantity, onRemove ,setTotalQuantities,setTotalPrice,setcartItems
}}/*the context of createContext*/
    >
        {children}
    </Context.Provider>
  )
  
}

export const useStateContext = () => useContext(Context);





