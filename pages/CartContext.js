"use client";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext({});

export default function CartContextProvider({ children }) {
  const { data: session } = useSession();
  const userLogged = session?.user?.name;
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCartProducts([...JSON.parse(storedCart)]);
  }, []);

  function addProduct(productId) {
    setCartProducts((prev) => {
      if (userLogged && productId?.userName === userLogged) {
        toast.warn("You own this product");
        return prev; // Return the unchanged state
      }

      toast.success("Product added to cart successfully!");
      const cartItem = [...prev, productId];
      localStorage.setItem("cart", JSON.stringify(cartItem));
      return cartItem; // Add the new product to the cart
    });
  }

  function removeProduct(productId) {
    setCartProducts((prev) => {
      const index = prev.indexOf(productId);

      if (index !== -1) {
        // Remove the first occurrence only, or leave the array unchanged if not found
        const cartItem = [...prev.slice(0, index), ...prev.slice(index + 1)];
        localStorage.setItem("cart", JSON.stringify(cartItem));
        return cartItem;
      }

      // If productId is not found, return the current state
      return prev;
    });
    toast.success("Product removed from cart successfully!");
  }

  return (
    <CartContext.Provider
      value={{ cartProducts, setCartProducts, addProduct, removeProduct }}
    >
      {children}
    </CartContext.Provider>
  );
}
