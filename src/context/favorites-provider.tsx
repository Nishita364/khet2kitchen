
'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { Produce } from './cart-provider';
import { useToast } from '@/hooks/use-toast';

interface FavoritesContextType {
  favoriteItems: Produce[];
  toggleFavorite: (item: Produce) => void;
  isFavorite: (itemName: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteItems, setFavoriteItems] = useState<Produce[]>([]);
  const { toast } = useToast();

  const toggleFavorite = useCallback((item: Produce) => {
    setFavoriteItems(prevItems => {
      const isAlreadyFavorite = prevItems.some(i => i.name === item.name);
      if (isAlreadyFavorite) {
        toast({ title: "Removed from Favorites", description: `${item.name} has been removed from your favorites.` });
        return prevItems.filter(i => i.name !== item.name);
      } else {
        toast({ title: "Added to Favorites", description: `${item.name} has been added to your favorites.` });
        return [...prevItems, item];
      }
    });
  }, [toast]);

  const isFavorite = useCallback((itemName: string) => {
    return favoriteItems.some(i => i.name === itemName);
  }, [favoriteItems]);

  const value = {
    favoriteItems,
    toggleFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
