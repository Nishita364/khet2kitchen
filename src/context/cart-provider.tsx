
'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

// A simplified interface for a produce item.
export interface Produce {
  name: string;
  farmer: string;
  price: string;
  status?: string;
  image: string;
  imageAiHint: string;
  grade?: string;
  category?: string;
  rating?: number;
  reviews?: number;
  description?: string;
  quantity?: number;
}

// Define the shape of the cart context
interface CartContextType {
  cartItems: Produce[];
  addToCart: (item: Produce) => void;
  removeFromCart: (itemName: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

// Create the context with a default undefined value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Create a provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Produce[]>([]);

  const addToCart = useCallback((item: Produce) => {
    setCartItems(prevItems => {
        const existingItem = prevItems.find(i => i.name === item.name);
        if(existingItem) {
            return prevItems.map(i => 
                i.name === item.name ? { ...i, quantity: (i.quantity || 1) + 1 } : i
            );
        }
        return [...prevItems, { ...item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((itemName: string) => {
    setCartItems(prevItems => prevItems.filter(i => i.name !== itemName));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);
  

  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const cartTotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g,""));
    return acc + price * (item.quantity || 1);
  }, 0);


  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
