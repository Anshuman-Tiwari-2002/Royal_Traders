import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category';
import Product from './models/Product';
import Customer from './models/Customer';
import Order from './models/Order';
import User from './models/User';
import Cart from './models/Cart';
import Wishlist from './models/Wishlist';
import RefreshToken from './models/RefreshToken';

dotenv.config();

const mongoUri = process.env.MONGODB_URI as string;

if (!mongoUri) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

// Sample data
const categories = [
  { 
    name: 'Wooden Toys', 
    description: 'Handcrafted wooden toys for children',
    slug: 'wooden-toys'
  },
  { 
    name: 'Wooden Furniture', 
    description: 'Elegant wooden furniture pieces',
    slug: 'wooden-furniture'
  },
  { 
    name: 'Wooden Decor', 
    description: 'Decorative wooden items for home',
    slug: 'wooden-decor'
  },
  {
    name: 'Wooden Kitchen',
    description: 'High-quality wooden kitchen utensils and accessories',
    slug: 'wooden-kitchen'
  }
];

const products = [
  {
    name: 'Wooden Building Blocks Set',
    description: 'Classic wooden building blocks made from sustainable wood',
    price: 2499,
    stock: 50,
    category: 'Wooden Toys',
    images: [
      '/images/products/wooden-blocks/main.jpg',
      '/images/products/wooden-blocks/detail-1.jpg',
      '/images/products/wooden-blocks/detail-2.jpg'
    ],
    specifications: {
      material: 'Natural Wood',
      ageGroup: '3+ years',
      pieces: 100
    }
  },
  {
    name: 'Wooden Rocking Horse',
    description: 'Traditional wooden rocking horse with smooth finish',
    price: 7499,
    stock: 20,
    category: 'Wooden Toys',
    images: [
      '/images/products/rocking-horse/main.jpg',
      '/images/products/rocking-horse/detail-1.jpg',
      '/images/products/rocking-horse/detail-2.jpg'
    ],
    specifications: {
      material: 'Solid Wood',
      ageGroup: '1-3 years',
      weight: '5 kg'
    }
  },
  {
    name: 'Wooden Coffee Table',
    description: 'Handcrafted wooden coffee table with modern design',
    price: 16999,
    stock: 15,
    category: 'Wooden Furniture',
    images: [
      '/images/products/coffee-table/main.jpg',
      '/images/products/coffee-table/detail-1.jpg',
      '/images/products/coffee-table/detail-2.jpg'
    ],
    specifications: {
      material: 'Oak Wood',
      dimensions: '120x60x45 cm',
      finish: 'Natural'
    }
  },
  {
    name: 'Wooden Wall Art',
    description: 'Decorative wooden wall art with intricate carvings',
    price: 6499,
    stock: 30,
    category: 'Wooden Decor',
    images: [
      '/images/products/wall-art/main.jpg',
      '/images/products/wall-art/detail-1.jpg',
      '/images/products/wall-art/detail-2.jpg'
    ],
    specifications: {
      material: 'Teak Wood',
      dimensions: '60x40 cm',
      style: 'Traditional'
    }
  },
  {
    name: 'Wooden Kitchen Utensil Set',
    description: 'Premium wooden kitchen utensils set with natural finish',
    price: 3999,
    stock: 25,
    category: 'Wooden Kitchen',
    images: [
      '/images/products/kitchen-utensils/main.jpg',
      '/images/products/kitchen-utensils/detail-1.jpg',
      '/images/products/kitchen-utensils/detail-2.jpg'
    ],
    specifications: {
      material: 'Maple Wood',
      pieces: 12,
      finish: 'Food Safe'
    }
  },
  {
    name: 'Maple Cutting Board',
    description: 'Professional grade maple wood cutting board',
    price: 2999,
    stock: 20,
    category: 'Wooden Kitchen',
    images: [
      '/images/products/cutting-board/main.jpg',
      '/images/products/cutting-board/detail-1.jpg',
      '/images/products/cutting-board/detail-2.jpg'
    ],
    specifications: {
      material: 'Hard Maple',
      dimensions: '45x30x2.5 cm',
      finish: 'Food Safe'
    }
  }
];

const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user',
    isEmailVerified: true
  },
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    isEmailVerified: true
  }
];

const customers = [
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '1234567890',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    orders: []
  },
  {
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '0987654321',
    address: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA'
    },
    orders: []
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Category.deleteMany({}),
      Product.deleteMany({}),
      Customer.deleteMany({}),
      Order.deleteMany({}),
      User.deleteMany({}),
      Cart.deleteMany({}),
      Wishlist.deleteMany({}),
      RefreshToken.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    console.log('Created categories');

    // Create products with category references
    const productsWithCategories = products.map(product => ({
      ...product,
      category: createdCategories.find(cat => cat.name === product.category)?._id
    }));
    const createdProducts = await Product.insertMany(productsWithCategories);
    console.log('Created products');

    // Create users
    const createdUsers = await User.insertMany(users);
    console.log('Created users');

    // Create customers
    const createdCustomers = await Customer.insertMany(customers);
    console.log('Created customers');

    // Create empty carts and wishlists for users
    await Promise.all(createdUsers.map(user => 
      Promise.all([
        Cart.create({ user: user._id, items: [], totalAmount: 0 }),
        Wishlist.create({ user: user._id, products: [] })
      ])
    ));
    console.log('Created carts and wishlists');

    // Create sample orders
    const orders = [
      {
        customer: createdCustomers[0]._id,
        items: [
          { product: createdProducts[0]._id, quantity: 2, price: createdProducts[0].price },
          { product: createdProducts[2]._id, quantity: 1, price: createdProducts[2].price }
        ],
        totalAmount: (createdProducts[0].price * 2) + createdProducts[2].price,
        status: 'delivered',
        paymentStatus: 'paid',
        shippingAddress: createdCustomers[0].address
      },
      {
        customer: createdCustomers[1]._id,
        items: [
          { product: createdProducts[1]._id, quantity: 1, price: createdProducts[1].price },
          { product: createdProducts[3]._id, quantity: 2, price: createdProducts[3].price }
        ],
        totalAmount: createdProducts[1].price + (createdProducts[3].price * 2),
        status: 'processing',
        paymentStatus: 'pending',
        shippingAddress: createdCustomers[1].address
      }
    ];

    await Order.insertMany(orders);
    console.log('Created orders');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 