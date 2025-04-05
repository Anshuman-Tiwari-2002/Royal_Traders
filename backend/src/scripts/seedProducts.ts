import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product';

dotenv.config();

const defaultProducts = [
  {
    name: 'Modern Sofa',
    description: 'Elegant modern sofa with premium fabric upholstery',
    price: 999.99,
    category: 'furniture',
    stock: 10,
    stockQuantity: 10,
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc'
    ],
    specifications: {
      Material: 'Premium Fabric',
      Dimensions: '84"W x 38"D x 34"H',
      Color: 'Gray',
      Style: 'Modern'
    },
    featured: true,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'LED Floor Lamp',
    description: 'Contemporary LED floor lamp with adjustable brightness',
    price: 149.99,
    category: 'lighting',
    stock: 15,
    stockQuantity: 15,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c'
    ],
    specifications: {
      Material: 'Metal, Glass',
      Dimensions: '18"W x 18"D x 65"H',
      Color: 'Black',
      Style: 'Contemporary'
    },
    featured: true,
    rating: 4.3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Decorative Vase',
    description: 'Handcrafted ceramic vase with unique pattern',
    price: 79.99,
    category: 'decor',
    stock: 20,
    stockQuantity: 20,
    images: [
      'https://images.unsplash.com/photo-1578500353865-d0e3d8f5f053',
      'https://images.unsplash.com/photo-1578500353865-d0e3d8f5f053'
    ],
    specifications: {
      Material: 'Ceramic',
      Dimensions: '12"H x 8"W',
      Color: 'Blue',
      Style: 'Bohemian'
    },
    featured: false,
    rating: 4.7,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Dining Table Set',
    description: '6-piece modern dining set with chairs',
    price: 1299.99,
    category: 'kitchen-dining',
    stock: 5,
    stockQuantity: 5,
    images: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf',
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf'
    ],
    specifications: {
      Material: 'Solid Wood',
      Dimensions: '72"L x 36"W x 30"H',
      Color: 'Natural',
      Style: 'Modern'
    },
    featured: true,
    rating: 4.8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Luxury Bathtub',
    description: 'Freestanding soaking tub with modern design',
    price: 2499.99,
    category: 'bathroom',
    stock: 3,
    stockQuantity: 3,
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a'
    ],
    specifications: {
      Material: 'Acrylic',
      Dimensions: '67"L x 32"W x 24"H',
      Color: 'White',
      Style: 'Contemporary'
    },
    featured: true,
    rating: 4.9,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Outdoor Lounge Set',
    description: 'Comfortable outdoor furniture set with cushions',
    price: 899.99,
    category: 'outdoor',
    stock: 8,
    stockQuantity: 8,
    images: [
      'https://images.unsplash.com/photo-1600210492493-0946911123ea',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea'
    ],
    specifications: {
      Material: 'Weather-resistant Fabric, Metal',
      Dimensions: 'Set of 4 pieces',
      Color: 'Gray',
      Style: 'Modern'
    },
    featured: true,
    rating: 4.6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/royal_traders');
    console.log('Connected to MongoDB');

    // Check if products already exist
    const existingProducts = await Product.find();
    
    if (existingProducts.length === 0) {
      // Insert default products
      await Product.insertMany(defaultProducts);
      console.log('Default products seeded successfully');
    } else {
      console.log('Products already exist in the database');
    }

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

// Run the seed function
seedProducts(); 