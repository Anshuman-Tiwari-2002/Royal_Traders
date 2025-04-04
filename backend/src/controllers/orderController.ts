import { Request, Response } from 'express';
import Order from '../models/Order';

export const getOrders = async (req: Request, res: Response) => {
  try {
    // Check if user exists
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name image price')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    // Check if user exists
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('items.product', 'name image price');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Error fetching order' });
  }
}; 