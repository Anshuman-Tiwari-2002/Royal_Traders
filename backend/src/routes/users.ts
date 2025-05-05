import express from 'express';
import { protect } from '../middleware/auth';
import User from '../models/User';
import { Types } from 'mongoose';
import { AuthenticatedRequest } from '../middleware/auth';

const router = express.Router();

// Get user's wishlist
router.get('/wishlist', protect, async (req: AuthenticatedRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const user = await User.findById(req.user._id).populate('wishlist');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist' });
  }
});

// Add to wishlist
router.post('/wishlist/:productId', protect, async (req: AuthenticatedRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const productId = new Types.ObjectId(req.params.productId);
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }
    res.json({ message: 'Product added to wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist' });
  }
});

// Remove from wishlist
router.delete('/wishlist/:productId', protect, async (req: AuthenticatedRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const productId = new Types.ObjectId(req.params.productId);
    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== productId.toString()
    );
    await user.save();
    res.json({ message: 'Product removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from wishlist' });
  }
});

// Get user's cart
router.get('/cart', protect, async (req: AuthenticatedRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const user = await User.findById(req.user._id).populate('cart.product');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart' });
  }
});

// Add to cart
router.post('/cart', protect, async (req: AuthenticatedRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const { productId, quantity } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const productObjectId = new Types.ObjectId(productId);
    const existingItem = user.cart.find(
      (item) => item.product.toString() === productObjectId.toString()
    );
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ product: productObjectId, quantity });
    }
    
    await user.save();
    res.json({ message: 'Product added to cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart' });
  }
});

// Update cart item quantity
router.put('/cart/:productId', protect, async (req: AuthenticatedRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const { quantity } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const productObjectId = new Types.ObjectId(req.params.productId);
    const item = user.cart.find(
      (item) => item.product.toString() === productObjectId.toString()
    );
    
    if (item) {
      item.quantity = quantity;
      await user.save();
      res.json({ message: 'Cart updated' });
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart' });
  }
});

// Remove from cart
router.delete('/cart/:productId', protect, async (req: AuthenticatedRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const productObjectId = new Types.ObjectId(req.params.productId);
    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productObjectId.toString()
    );
    await user.save();
    res.json({ message: 'Product removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from cart' });
  }
});

export default router; 