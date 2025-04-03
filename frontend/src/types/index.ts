export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  stockQuantity: number;
  images: string[];
  specifications: {
    Material: string;
    Dimensions: string;
    Color: string;
    Style: string;
  };
  featured: boolean;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  isEmailVerified: boolean;
  isLoggedIn: boolean;
  phone?: string;
  address?: string;
}
