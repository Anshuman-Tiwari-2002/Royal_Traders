import { Request, Response } from 'express';
import Wishlist from '../models/Wishlist';
import Product from '../models/Product';

export const getWishlist = async (req: Request, res: Response) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user.id })
      .populate('products')
      .exec();

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    res.json(wishlist.products);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Error fetching wishlist' });
  }
};

export const addToWishlist = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Add product to wishlist using $addToSet to avoid duplicates
    const wishlist = await Wishlist.findOneAndUpdate(
      { userId: req.user._id },
      { 
        $addToSet: { products: productId },
        $set: { updatedAt: new Date().toISOString() }
      },
      { 
        new: true,
        upsert: true,
        setDefaultsOnInsert: true 
      }
    ).populate('products');

    res.json(wishlist.products);

    // Populate the products before sending response
    await wishlist.populate('products');
    res.json(wishlist.products);
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: 'Error adding to wishlist' });
  }
};

export const removeFromWishlist = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ userId: req.user._id });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.products = wishlist.products.filter(
      (id: any) => id.toString() !== productId
    );
    wishlist.updatedAt = new Date().toISOString();
    await wishlist.save();

    // Populate the products before sending response
    await wishlist.populate('products');
    res.json(wishlist.products);
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ message: 'Error removing from wishlist' });
  }
};