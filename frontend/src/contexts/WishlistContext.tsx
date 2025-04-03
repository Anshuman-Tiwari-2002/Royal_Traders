import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';
import api from '../lib/axios';

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await api.get('wishlist');
      setWishlist(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setWishlist([]); // Ensure wishlist is always an array
    } finally {
      setIsLoading(false);
    }
  };

  const addToWishlist = async (productId: string) => {
    try {
      await api.post('wishlist', { productId });
      const response = await api.get('wishlist');
      setWishlist(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      await api.delete(`/wishlist/${productId}`);
      const response = await api.get('wishlist');
      setWishlist(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isLoading }}>
      {children}
    </WishlistContext.Provider>
  );
};