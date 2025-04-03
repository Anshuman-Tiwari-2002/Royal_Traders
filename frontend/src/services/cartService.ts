import { CartItem } from '../types';
import { api } from './api';

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
      const response = await api.get<ServerCart>('/cart');
      return transformServerCart(response.data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      return [];
    }
  },

  async addToCart(productId: string, quantity: number): Promise<CartItem[]> {
    const response = await api.post<ServerCart>('/cart/items', { productId, quantity });
    return transformServerCart(response.data);
  },

  async updateQuantity(productId: string, quantity: number): Promise<CartItem[]> {
    const response = await api.put<ServerCart>(`/cart/items/${productId}`, { quantity });
    return transformServerCart(response.data);
  },

  async removeFromCart(productId: string): Promise<CartItem[]> {
    const response = await api.delete<ServerCart>(`/cart/items/${productId}`);
    return transformServerCart(response.data);
  },

  async clearCart(): Promise<CartItem[]> {
    const response = await api.delete<ServerCart>('/cart');
    return transformServerCart(response.data);
  }
};