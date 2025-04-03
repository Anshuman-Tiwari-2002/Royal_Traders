import express from 'express';
import { getWishlist, addToWishlist, removeFromWishlist } from '../controllers/wishlistController';
import authMiddleware from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Get wishlist
router.get('/', getWishlist);

// Add product to wishlist
router.post('/', addToWishlist);

// Remove product from wishlist
router.delete('/:productId', removeFromWishlist);

export default router; 