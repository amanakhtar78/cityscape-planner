import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PlaceDetail } from '@/data/tripData';

interface CartContextType {
  cartItems: PlaceDetail[];
  addToCart: (place: PlaceDetail) => void;
  removeFromCart: (placeId: string) => void;
  clearCart: () => void;
  isInCart: (placeId: string) => boolean;
  totalEstimatedCost: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<PlaceDetail[]>([]);

  const addToCart = (place: PlaceDetail) => {
    if (!cartItems.find(item => item.id === place.id)) {
      setCartItems(prev => [...prev, place]);
    }
  };

  const removeFromCart = (placeId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== placeId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (placeId: string) => {
    return cartItems.some(item => item.id === placeId);
  };

  const totalEstimatedCost = cartItems.reduce((sum, item) => sum + item.estimatedCost, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      isInCart,
      totalEstimatedCost,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};