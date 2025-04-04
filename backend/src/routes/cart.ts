import express from 'express';
import auth from '../middleware/auth';
import Cart from '../models/Cart';
import Product from '../models/Product';

const router = express.Router();

// Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const userId = req.user._id;
    console.log('Getting cart for user:', userId);
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    
    if (!cart) {
      console.log('Cart not found, creating new cart for user:', userId);
      cart = new Cart({
        user: userId,
        items: [],
        totalAmount: 0
      });
      await cart.save();
      console.log('New cart created:', cart);
    }
    
    console.log('Cart found/created:', cart);
    res.json(cart);
  } catch (error) {
    console.error('Error getting cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add item to cart
router.post('/items', auth, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const userId = req.user._id;
    console.log('Adding item to cart for user:', userId);
    console.log('Request body:', req.body);
    const { productId, quantity } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) {
      console.log('Product not found:', productId);
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('Product found:', product);

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      console.log('Creating new cart for user:', userId);
      cart = new Cart({ user: userId, items: [], totalAmount: 0 });
    }
    console.log('Current cart:', cart);

    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      console.log('Updating existing item quantity');
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      console.log('Adding new item to cart');
      cart.items.push({
        product: productId,
        quantity,
        price: product.price
      });
    }

    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    console.log('Saving cart...');
    await cart.save();
    const populatedCart = await cart.populate('items.product');
    console.log('Cart saved successfully:', populatedCart);
    res.json(populatedCart);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update item quantity
router.put('/items/:productId', auth, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const userId = req.user._id;
    console.log('Updating item quantity for user:', userId);
    console.log('Request params:', req.params);
    console.log('Request body:', req.body);
    const { quantity } = req.body;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      console.log('Cart not found for user:', userId);
      return res.status(404).json({ message: 'Cart not found' });
    }
    console.log('Current cart:', cart);

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      console.log('Item not found in cart:', productId);
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity <= 0) {
      console.log('Removing item from cart');
      cart.items.splice(itemIndex, 1);
    } else {
      console.log('Updating item quantity');
      cart.items[itemIndex].quantity = quantity;
    }

    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    console.log('Saving cart...');
    await cart.save();
    const populatedCart = await cart.populate('items.product');
    console.log('Cart saved successfully:', populatedCart);
    res.json(populatedCart);
  } catch (error) {
    console.error('Error updating item quantity:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove item from cart
router.delete('/items/:productId', auth, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const userId = req.user._id;
    console.log('Removing item from cart for user:', userId);
    console.log('Request params:', req.params);
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      console.log('Cart not found for user:', userId);
      return res.status(404).json({ message: 'Cart not found' });
    }
    console.log('Current cart:', cart);

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === req.params.productId
    );

    if (itemIndex === -1) {
      console.log('Item not found in cart:', req.params.productId);
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    console.log('Removing item from cart');
    cart.items.splice(itemIndex, 1);
    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    console.log('Saving cart...');
    await cart.save();
    const populatedCart = await cart.populate('items.product');
    console.log('Cart saved successfully:', populatedCart);
    res.json(populatedCart);
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Clear cart
router.delete('/', auth, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const userId = req.user._id;
    console.log('Clearing cart for user:', userId);
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      console.log('Cart not found for user:', userId);
      return res.status(404).json({ message: 'Cart not found' });
    }
    console.log('Current cart:', cart);

    cart.items = [];
    cart.totalAmount = 0;
    console.log('Saving cart...');
    await cart.save();
    console.log('Cart cleared successfully:', cart);
    res.json(cart);
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;