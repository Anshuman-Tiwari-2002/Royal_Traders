import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';
import api from '@/lib/api';
import { useAuth } from './AuthContext';

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
  const { user } = useAuth();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) {
        setWishlist([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await api.get('/users/wishlist');
        setWishlist(response.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, [user]);

  const addToWishlist = async (productId: string) => {
    try {
      await api.post(`/users/wishlist/${productId}`);
      const response = await api.get('/users/wishlist');
      setWishlist(response.data);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      await api.delete(`/users/wishlist/${productId}`);
      const response = await api.get('/users/wishlist');
      setWishlist(response.data);
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