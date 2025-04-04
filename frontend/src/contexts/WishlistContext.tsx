import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';
import api from '../services/api';

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  addToWishlist: async () => {},
  removeFromWishlist: async () => {},
  isInWishlist: () => false,
  isLoading: false
});

export function useWishlist(): WishlistContextType {
  return useContext(WishlistContext);
}

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await api.get('/wishlist');
      setWishlist(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setWishlist([]); // Ensure wishlist is always an array
    } finally {
      setIsLoading(false);
    }
  };

  const addToWishlist = async (productId: string) => {
    try {
      await api.post('/wishlist', { productId });
      const response = await api.get('/wishlist');
      setWishlist(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      await api.delete(`/wishlist/${productId}`);
      const response = await api.get('/wishlist');
      setWishlist(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlist.some(product => product._id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, isLoading }}>
      {children}
    </WishlistContext.Provider>
  );
};