/*import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateCart = (productId, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeCartItem = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );
    setTotalPrice(totalPrice);
  };

  const calculateTotalItems = () => {
    const totalItems = cartItems.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0
    );
    setTotalItems(totalItems);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        totalItems,
        addToCart,
        updateCart,
        removeCartItem,
        clearCart,
        calculateTotalPrice,
        calculateTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
*/