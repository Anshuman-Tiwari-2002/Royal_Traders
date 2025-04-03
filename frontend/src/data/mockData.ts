import { Product } from '@/types/product';
import { Category } from '@/types';

// Helper function to create consistent date strings
const createDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Helper function to generate MongoDB ObjectId
const generateObjectId = (): string => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
  const machineId = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
  const processId = Math.floor(Math.random() * 65536).toString(16).padStart(4, '0');
  const counter = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
  return `${timestamp}${machineId}${processId}${counter}`;
};

export const products: Product[] = [
  {
    _id: generateObjectId(),
    name: "Walnut Dining Table",
    description: "Elegant solid walnut dining table with modern design",
    price: 1299.99,
    category: "Furniture",
    stock: 15,
    stockQuantity: 15,
    images: ["/images/products/walnut-dining-table.jpg"],
    specifications: {
      "Material": "Solid Walnut",
      "Dimensions": "180cm x 90cm x 75cm",
      "Color": "Natural Walnut",
      "Style": "Modern"
    },
    featured: true,
    rating: 4.8,
    createdAt: createDate(30),
    updatedAt: createDate(5)
  },
  {
    _id: generateObjectId(),
    name: "Oak Bookshelf",
    description: "Classic oak bookshelf with adjustable shelves",
    price: 899.99,
    category: "Furniture",
    stock: 20,
    stockQuantity: 20,
    images: ["/images/products/oak-bookshelf.jpg"],
    specifications: {
      "Material": "Solid Oak",
      "Dimensions": "180cm x 40cm x 30cm",
      "Color": "Natural Oak",
      "Style": "Classic"
    },
    featured: true,
    rating: 4.6,
    createdAt: createDate(45),
    updatedAt: createDate(10)
  },
  {
    _id: generateObjectId(),
    name: "Leather Sofa",
    description: "Premium leather sofa with reclining seats",
    price: 2499.99,
    category: "Furniture",
    stock: 10,
    stockQuantity: 10,
    images: ["/images/products/leather-sofa.jpg"],
    specifications: {
      "Material": "Genuine Leather",
      "Dimensions": "240cm x 90cm x 85cm",
      "Color": "Brown",
      "Style": "Contemporary"
    },
    featured: true,
    rating: 4.9,
    createdAt: createDate(60),
    updatedAt: createDate(15)
  },
  {
    _id: generateObjectId(),
    name: "Ceramic Vase",
    description: "Handcrafted ceramic vase with unique pattern",
    price: 129.99,
    category: "Decor",
    stock: 50,
    stockQuantity: 50,
    images: ["/images/products/ceramic-vase.jpg"],
    specifications: {
      "Material": "Ceramic",
      "Dimensions": "30cm x 15cm",
      "Color": "Blue and White",
      "Style": "Artisanal"
    },
    featured: false,
    rating: 4.5,
    createdAt: createDate(90),
    updatedAt: createDate(20)
  },
  {
    _id: generateObjectId(),
    name: "Wall Art Print",
    description: "Modern abstract wall art print",
    price: 79.99,
    category: "Decor",
    stock: 100,
    stockQuantity: 100,
    images: ["/images/products/wall-art.jpg"],
    specifications: {
      "Material": "Canvas",
      "Dimensions": "60cm x 40cm",
      "Color": "Multicolor",
      "Style": "Abstract"
    },
    featured: false,
    rating: 4.3,
    createdAt: createDate(120),
    updatedAt: createDate(25)
  },
  {
    _id: generateObjectId(),
    name: "Table Lamp",
    description: "Contemporary LED table lamp",
    price: 149.99,
    category: "Lighting",
    stock: 30,
    stockQuantity: 30,
    images: ["/images/products/table-lamp.jpg"],
    specifications: {
      "Material": "Metal and Glass",
      "Dimensions": "45cm x 25cm",
      "Color": "Black and White",
      "Style": "Modern"
    },
    featured: true,
    rating: 4.7,
    createdAt: createDate(75),
    updatedAt: createDate(30)
  },
  {
    _id: generateObjectId(),
    name: "Area Rug",
    description: "Hand-knotted wool area rug",
    price: 599.99,
    category: "Decor",
    stock: 25,
    stockQuantity: 25,
    images: ["/images/products/area-rug.jpg"],
    specifications: {
      "Material": "Wool",
      "Dimensions": "200cm x 150cm",
      "Color": "Beige and Gray",
      "Style": "Traditional"
    },
    featured: true,
    rating: 4.8,
    createdAt: createDate(105),
    updatedAt: createDate(35)
  },
  {
    _id: generateObjectId(),
    name: "Coffee Table",
    description: "Glass and metal coffee table",
    price: 399.99,
    category: "Furniture",
    stock: 18,
    stockQuantity: 18,
    images: ["/images/products/coffee-table.jpg"],
    specifications: {
      "Material": "Glass and Metal",
      "Dimensions": "120cm x 60cm x 45cm",
      "Color": "Clear and Chrome",
      "Style": "Contemporary"
    },
    featured: false,
    rating: 4.4,
    createdAt: createDate(135),
    updatedAt: createDate(40)
  }
];

export const categories: Category[] = [
  {
    id: generateObjectId(),
    name: "Furniture",
    image: "/images/categories/furniture.jpg"
  },
  {
    id: generateObjectId(),
    name: "Decor",
    image: "/images/categories/decor.jpg"
  },
  {
    id: generateObjectId(),
    name: "Lighting",
    image: "/images/categories/lighting.jpg"
  }
];
