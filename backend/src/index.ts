import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import orderRoutes from './routes/orderRoutes';
import wishlistRoutes from './routes/wishlistRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/royal_traders';

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Royal Traders API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});