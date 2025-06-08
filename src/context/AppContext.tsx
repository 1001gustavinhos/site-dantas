// src/context/AppContext.tsx
"use client";

import type { Product, CartItem, UserInfo } from '@/lib/types';
import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';

interface AppState {
  cart: CartItem[];
  user: UserInfo | null;
}

interface AppContextType extends AppState {
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUserState] = useState<UserInfo | null>(null);

  const addToCart = useCallback((product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  const updateItemQuantity = useCallback((productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter(item => item.quantity > 0) // Remove item if quantity is 0
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const setUser = useCallback((userInfo: UserInfo) => {
    setUserState(userInfo);
  }, []);

  const clearUser = useCallback(() => {
    setUserState(null);
  }, []);

  const getTotalPrice = useCallback(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const getTotalItems = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);
  
  const contextValue = useMemo(() => ({
    cart,
    user,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    setUser,
    clearUser,
    getTotalPrice,
    getTotalItems,
  }), [cart, user, addToCart, removeFromCart, updateItemQuantity, clearCart, setUser, clearUser, getTotalPrice, getTotalItems]);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
