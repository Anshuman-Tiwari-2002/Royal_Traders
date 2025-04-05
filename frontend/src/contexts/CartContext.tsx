import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../types';
import { toast } from 'sonner';
import { cartService } from '../services/cartService';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  subtotal: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    let isMounted = true;
    
    const initializeCart = async () => {
      try {
        setIsLoading(true);
        const storedCart = localStorage.getItem('cart');
        if (storedCart && isMounted) {
          try {
            setItems(JSON.parse(storedCart));
          } catch (error) {
            console.error('Failed to parse cart from localStorage:', error);
            setItems([]);
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error('Failed to initialize cart:', error);
          toast.error('Failed to load cart');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    initializeCart();
    
    return () => {
      isMounted = false;
    };
  }, []);
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = async (product: Product, quantity: number) => {
    try {
      setItems(prevItems => {
        const existingItemIndex = prevItems.findIndex(item => item.product._id === product._id);
        
        if (existingItemIndex >= 0) {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + quantity
          };
          return updatedItems;
        } else {
          return [...prevItems, { product, quantity }];
        }
      });
      toast.success(`Added ${product.name} to cart`);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      toast.error('Failed to add item to cart');
      throw error;
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      setItems(prevItems => prevItems.filter(item => item.product._id !== productId));
      const item = items.find(i => i.product._id === productId);
      if (item) {
        toast.info(`Removed ${item.product.name} from cart`);
      }
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
      toast.error('Failed to remove item from cart');
      throw error;
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    try {
      setItems(prevItems => 
        prevItems.map(item =>
          item.product._id === productId
            ? { ...item, quantity }
            : item
        )
      );
    } catch (error) {
      console.error('Failed to update item quantity:', error);
      toast.error('Failed to update item quantity');
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      setItems([]);
      toast.info('Cart cleared');
    } catch (error) {
      console.error('Failed to clear cart:', error);
      toast.error('Failed to clear cart');
      throw error;
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
      subtotal,
      isLoading
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
