import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

export type CartItemType  = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItemType[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: CartItemType) => void;
  updateCart: (productId: number, quantity: number) => void;
  incrementCartItem: (productId: number, quantityToAdd: number) => void;
  removeCartItem: (productId: number) => void;
  clearCart: () => void;
  calculateCartTotals: () => void;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
  addToCart: () => {},
  updateCart: () => {},
  incrementCartItem: () => {},
  removeCartItem: () => {},
  clearCart: () => {},
  calculateCartTotals: () => {},
});

export const useCartContext = () => useContext(CartContext);


export const CartProvider = ({ children }: { children: ReactNode }) => {

  const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  const storedTotalPrice = JSON.parse(localStorage.getItem('totalPrice') || '0');
  const storedTotalItems = JSON.parse(localStorage.getItem('totalItems') || '0');

  const [cartItems, setCartItems] = useState(storedCartItems);
  const [totalPrice, setTotalPrice] = useState(storedTotalPrice);
  const [totalItems, setTotalItems] = useState(storedTotalItems);

  const addToCart = (product: CartItemType) => {
    const existingItem = cartItems.find((item: CartItemType) => item.id === product.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item: CartItemType) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateCart = (productId: number, quantity: number) => {
    setCartItems(
      cartItems.map((item: CartItemType) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  const incrementCartItem = (productId: number, quantityToAdd: number) => {
    setCartItems((prevCartItems: CartItemType[]) =>
      prevCartItems.map((item: CartItemType) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + quantityToAdd }
          : item
      )
    );
    calculateCartTotals();
  };

  const removeCartItem = (productId: number) => {
    setCartItems(cartItems.filter((item: CartItemType) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const calculateCartTotals = () => {
    const totalPrice = cartItems.reduce(
      (accumulator: number, item: CartItemType) => accumulator + item.price * item.quantity,
      0
    );
    setTotalPrice(totalPrice);
  
    const totalItems = cartItems.reduce(
      (accumulator: number, item: CartItemType) => accumulator + item.quantity,
      0
    );
    setTotalItems(totalItems);
  };

  useEffect(() => {
    calculateCartTotals();
  }, [cartItems]);

  

  useEffect(() => {
    calculateCartTotals();
    // Guardar los datos del carrito en el almacenamiento local
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
    localStorage.setItem('totalItems', JSON.stringify(totalItems));
  }, [cartItems, totalPrice, totalItems]);
  

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
        calculateCartTotals,
        incrementCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
