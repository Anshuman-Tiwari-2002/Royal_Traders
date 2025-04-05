import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category';

dotenv.config();

const defaultCategories = [
  {
    name: 'Furniture',
    description: 'Elegant furniture pieces for your home',
    slug: 'furniture'
  },
  {
    name: 'Lighting',
    description: 'Beautiful lighting solutions for every room',
    slug: 'lighting'
  },
  {
    name: 'Decor',
    description: 'Stylish decorative items to enhance your space',
    slug: 'decor'
  },
  {
    name: 'Kitchen & Dining',
    description: 'Everything you need for your kitchen and dining area',
    slug: 'kitchen-dining'
  },
  {
    name: 'Bathroom',
    description: 'Luxury bathroom fixtures and accessories',
    slug: 'bathroom'
  },
  {
    name: 'Outdoor',
    description: 'Outdoor furniture and accessories for your garden',
    slug: 'outdoor'
  }
];

const seedCategories = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/royal_traders');
    console.log('Connected to MongoDB');

    // Check if categories already exist
    const existingCategories = await Category.find();
    
    if (existingCategories.length === 0) {
      // Insert default categories
      await Category.insertMany(defaultCategories);
      console.log('Default categories seeded successfully');
    } else {
      console.log('Categories already exist in the database');
    }

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding categories:', error);
  }
};

// Run the seeding function
seedCategories(); 