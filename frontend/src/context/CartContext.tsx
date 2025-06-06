import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem } from "../types/CartItem";

interface CartContexType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookID: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContexType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((x) => x.bookID === item.bookID);
      const updatedCart = prevCart.map((x) =>
        x.bookID === item.bookID
          ? { ...x, itemAmount: x.itemAmount + item.itemAmount }
          : x,
      );

      return existingItem ? updatedCart : [...prevCart, item];
    });
  };
  const removeFromCart = (bookID: number) => {
    setCart((prevCart) => prevCart.filter((x) => x.bookID !== bookID));
  };

  const clearCart = () => {
    setCart(() => []);
  };
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CardPorvider");
  }
  return context;
};
