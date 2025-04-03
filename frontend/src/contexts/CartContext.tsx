import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../types';
import { toast } from 'sonner';
import { cartService } from '../services/cartService';
import { useAuth } from './AuthContext';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    const initializeCart = async () => {
      if (isAuthenticated) {
        try {
          const serverCart = await cartService.getCart();
          setItems(serverCart);
          localStorage.setItem('cart', JSON.stringify(serverCart));
        } catch (error) {
          console.error('Failed to fetch cart from server:', error);
          const storedCart = localStorage.getItem('cart');
          if (storedCart) {
            try {
              setItems(JSON.parse(storedCart));
            } catch (error) {
              console.error('Failed to parse cart from localStorage:', error);
              setItems([]);
            }
          }
        }
      } else {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          try {
            setItems(JSON.parse(storedCart));
          } catch (error) {
            console.error('Failed to parse cart from localStorage:', error);
            setItems([]);
          }
        }
      }
    };
    
    initializeCart();
  }, [isAuthenticated]);
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = async (product: Product, quantity: number) => {
    try {
      if (isAuthenticated) {
        const updatedCart = await cartService.addToCart(product._id, quantity);
        setItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      } else {
        setItems(prevItems => {
          const existingItemIndex = prevItems.findIndex(item => item.product._id === product._id);
          
          if (existingItemIndex >= 0) {
            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + quantity
            };
            localStorage.setItem('cart', JSON.stringify(updatedItems));
            return updatedItems;
          } else {
            const updatedItems = [...prevItems, { product, quantity }];
            localStorage.setItem('cart', JSON.stringify(updatedItems));
            return updatedItems;
          }
        });
      }
      toast.success(`Added ${product.name} to cart`);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      if (isAuthenticated) {
        const updatedCart = await cartService.removeFromCart(productId);
        setItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      } else {
        setItems(prevItems => {
          const filteredItems = prevItems.filter(item => item.product._id !== productId);
          localStorage.setItem('cart', JSON.stringify(filteredItems));
          return filteredItems;
        });
      }
      const item = items.find(i => i.product._id === productId);
      if (item) {
        toast.info(`Removed ${item.product.name} from cart`);
      }
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    try {
      if (isAuthenticated) {
        const updatedCart = await cartService.updateQuantity(productId, quantity);
        setItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      } else {
        setItems(prevItems => {
          const updatedItems = prevItems.map(item =>
            item.product._id === productId
              ? { ...item, quantity }
              : item
          );
          localStorage.setItem('cart', JSON.stringify(updatedItems));
          return updatedItems;
        });
      }
    } catch (error) {
      console.error('Failed to update item quantity:', error);
      toast.error('Failed to update item quantity');
    }
  };

  const clearCart = async () => {
    try {
      if (isAuthenticated) {
        await cartService.clearCart();
      }
      setItems([]);
      localStorage.setItem('cart', JSON.stringify([]));
      toast.info('Cart cleared');
    } catch (error) {
      console.error('Failed to clear cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
