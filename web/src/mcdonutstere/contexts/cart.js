import React, { createContext, useContext, useState } from "react";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [addressId, setAddressId] = useState("0");
  const [payment, setPayment] = useState("Dinheiro com troco");
  const [note, setNote] = useState("Nenhuma.");

  function addItem(item) {
    const alreadyExistItem = cartItems.find(
      (cartItem) => cartItem.product._id == item._id
    );

    if (alreadyExistItem) {
      const quantity = (alreadyExistItem.quantity += 1);
      updateQuantity(item, Number(quantity));
    } else {
      const newItem = { product: item, quantity: 1 };
      setCartItems([...cartItems, newItem]);
    }
  }

  function removeItem(id) {
    const filteredItem = cartItems.filter((item) => item.product._id !== id);
    setCartItems(filteredItem);
  }

  function updateQuantity(item, quantity) {
    const updateItem = {
      product: item,
      quantity: Number(quantity),
    };
    const itemIndex = cartItems.findIndex(
      (cartItem) => cartItem.product._id == item._id
    );
    cartItems[itemIndex] = updateItem;

    setCartItems(cartItems);
  }

  function inicializarVariaveisCard() {
    setCartItems([]);
    setAddressId("0");
    setPayment("Dinheiro com troco");
    setNote("Nenhuma.");
  }

  return (
    <CartContext.Provider
      value={{
        addItem,
        removeItem,
        cartItems,
        updateQuantity,
        addressId,
        payment,
        setPayment,
        setAddressId,
        note,
        setNote,
        inicializarVariaveisCard,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export function useCart() {
  const context = useContext(CartContext);
  return context;
}
