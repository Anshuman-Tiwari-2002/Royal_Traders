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

export interface Category {
  id: string;
  name: string;
  image: string;
} 