"use client"
import { useSession } from 'next-auth/react';
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

 const CartContext = createContext({});

 export function CartContextProvider({children}) {
    const {data:session} =useSession()
    const userLogged = session?.user?.name;
    //storing id into local storage
    const ls = typeof Window !== "undefined" ? Window.localStorage : null;

    const [cartProducts, setCartProducts] = useState([]);

    useEffect(()=>{
        ls?.setItem('cart', JSON.stringify(cartProducts))
    },cartProducts)

    useEffect(()=>{
        if(ls && ls.getItem('cart'))
        { 
            setCartProducts(JSON.parse(ls.getItem('cart')));
        }
    },[])

    function addProduct(productId){
      if(userLogged)
     {
      if(productId.userName === userLogged)
      {
        setCartProducts((prev)=>[...prev])
        toast.warn("You own this product")
      }}
       else{
          setCartProducts((prev)=>[...prev, productId])
          toast.success("Product added to cart succesfully!")}
    }
    
    function removeProduct(productId) {
        setCartProducts((prev) => {
          const index = prev.indexOf(productId);
      
          if (index !== -1) {
            // Remove the first occurrence only, or leave the array unchanged if not found
            return index !== -1 ? [...prev.slice(0, index), ...prev.slice(index + 1)] : prev;
          }
      
          // If productId is not found, return the current state
          return prev;
          
        });
        toast.success("Product removed from cart successfully!")
      }
      
      
      
    
  return (
    <CartContext.Provider value = {{cartProducts , setCartProducts, addProduct, removeProduct}}>
        {children}
    </CartContext.Provider>
  )
}
export default CartContext;