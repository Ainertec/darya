import React, { createContext, useContext, useState } from "react";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  function addItem(item) {
    const newItem = { product: item, quantity: 1 };
    setCartItems([...cartItems, newItem]);
  }
  function removeItem(id) {
    const filteredItem = cartItems.filter((item) => item.product._id !== id);
    setCartItems(filteredItem);
  }

  return (
    <CartContext.Provider value={{ addItem, removeItem, cartItems }}>
      {children}
    </CartContext.Provider>
  );
};
export function useCart() {
  const context = useContext(CartContext);
  return context;
}
