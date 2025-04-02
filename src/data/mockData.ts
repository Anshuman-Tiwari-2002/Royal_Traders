
import { Product, Category } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Walnut Dining Table',
    description: 'Elegant walnut dining table with smooth finish and sturdy construction. Perfect for family gatherings and dinner parties.',
    price: 899.99,
    images: [
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    ],
    category: 'furniture',
    stockQuantity: 10,
    featured: true,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Oak Bookshelf',
    description: 'Spacious oak bookshelf with adjustable shelves. Perfect for displaying your book collection or decorative items.',
    price: 499.99,
    images: [
      'https://images.unsplash.com/photo-1588200618450-3a5b1d3b9aa5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      'https://images.unsplash.com/photo-1588200618450-3a5b1d3b9aa5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    ],
    category: 'furniture',
    stockQuantity: 15,
    featured: false,
    rating: 4.5,
  },
  {
    id: '3',
    name: 'Wooden Kitchen Utensil Set',
    description: 'Complete kitchen utensil set made from premium quality wood. Includes spatulas, spoons, and serving tools.',
    price: 49.99,
    images: [
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    ],
    category: 'kitchenware',
    stockQuantity: 30,
    featured: true,
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Handcrafted Jewelry Box',
    description: 'Beautiful handcrafted wooden jewelry box with multiple compartments and intricate detailing.',
    price: 79.99,
    images: [
      'https://images.unsplash.com/photo-1584378687113-9a1d5dc50cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      'https://images.unsplash.com/photo-1584378687113-9a1d5dc50cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    ],
    category: 'decor',
    stockQuantity: 20,
    featured: false,
    rating: 4.9,
  },
  {
    id: '5',
    name: 'Maple Cutting Board',
    description: 'Premium maple wood cutting board with juice groove. Durable and knife-friendly surface.',
    price: 39.99,
    images: [
      'https://images.unsplash.com/photo-1606760562152-ab702fb7ee8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      'https://images.unsplash.com/photo-1606760562152-ab702fb7ee8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    ],
    category: 'kitchenware',
    stockQuantity: 25,
    featured: true,
    rating: 4.6,
  },
  {
    id: '6',
    name: 'Cherry Wood Coffee Table',
    description: 'Elegant cherry wood coffee table with storage shelf. Perfect centerpiece for any living room.',
    price: 349.99,
    images: [
      'https://images.unsplash.com/photo-1565191888993-e64b3cfc4acc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      'https://images.unsplash.com/photo-1565191888993-e64b3cfc4acc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    ],
    category: 'furniture',
    stockQuantity: 8,
    featured: true,
    rating: 4.7,
  },
  {
    id: '7',
    name: 'Wooden Wall Clock',
    description: 'Minimalist wooden wall clock with silent mechanism. Adds a touch of nature to any room.',
    price: 59.99,
    images: [
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    ],
    category: 'decor',
    stockQuantity: 18,
    featured: false,
    rating: 4.5,
  },
  {
    id: '8',
    name: 'Wooden Salad Bowl Set',
    description: 'Set of 4 wooden salad bowls with serving utensils. Perfect for entertaining guests.',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1579329974377-10c7360b06c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      'https://images.unsplash.com/photo-1579329974377-10c7360b06c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    ],
    category: 'kitchenware',
    stockQuantity: 12,
    featured: false,
    rating: 4.4,
  },
];

export const categories: Category[] = [
  {
    id: '1',
    name: 'Furniture',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
  },
  {
    id: '2',
    name: 'Kitchenware',
    image: 'https://images.unsplash.com/photo-1594731804029-1c6c93e5fc61?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
  },
  {
    id: '3',
    name: 'Decor',
    image: 'https://images.unsplash.com/photo-1529619768328-e37af76c6fe5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
  },
  {
    id: '4',
    name: 'Office',
    image: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
  },
];
