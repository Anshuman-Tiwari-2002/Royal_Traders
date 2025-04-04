import { CartItem } from '../types';
import api from './api';

export interface ServerCartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
  price: number;
}

export interface ServerCart {
  _id: string;
  user: string;
  items: ServerCartItem[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

const transformServerCart = (serverCart: ServerCart): CartItem[] => {
  return serverCart.items.map(item => ({
    product: {
      _id: item.product._id,
      name: item.product.name,
      description: '',
      price: item.product.price,
      category: '',
      stock: 0,
      stockQuantity: 0,
      images: item.product.images,
      specifications: {
        Material: '',
        Dimensions: '',
        Color: '',
        Style: ''
      },
      featured: false,
      rating: 0,
      createdAt: '',
      updatedAt: ''
    },
    quantity: item.quantity
  }));
};

export const cartService = {
  async getCart(): Promise<CartItem[]> {
    try {
      console.log('Fetching cart...');
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      const response = await api.get<ServerCart>('/cart');
      const cartData = response.data;
      console.log('Cart response:', cartData);
      
      if (!cartData || !cartData._id || !cartData.items) {
        console.error('Invalid cart response:', cartData);
        return [];
      }
      
      return transformServerCart(cartData);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      throw error;
    }
  },

  async addToCart(productId: string, quantity: number): Promise<CartItem[]> {
    try {
      console.log('Adding to cart:', { productId, quantity });
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      const response = await api.post<ServerCart>('/cart/items', { productId, quantity });
      return transformServerCart(response.data);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw error;
    }
  },

  async updateQuantity(productId: string, quantity: number): Promise<CartItem[]> {
    try {
      console.log('Updating quantity:', { productId, quantity });
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      const response = await api.put<ServerCart>(`/cart/items/${productId}`, { quantity });
      console.log('Update quantity response:', response.data);
      return transformServerCart(response.data);
    } catch (error) {
      console.error('Failed to update item quantity:', error);
      throw error;
    }
  },

  async removeFromCart(productId: string): Promise<CartItem[]> {
    try {
      console.log('Removing from cart:', productId);
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      const response = await api.delete<ServerCart>(`/cart/items/${productId}`);
      return transformServerCart(response.data);
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      throw error;
    }
  },

  async clearCart(): Promise<CartItem[]> {
    try {
      console.log('Clearing cart...');
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      const response = await api.delete<ServerCart>('/cart');
      return transformServerCart(response.data);
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    }
  }
};