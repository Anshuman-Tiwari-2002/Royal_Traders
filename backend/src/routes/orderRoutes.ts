import express from 'express';
import { getOrders, getOrderById } from '../controllers/orderController';
import authMiddleware from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Get all orders for the authenticated user
router.get('/', getOrders);

// Get a specific order by ID
router.get('/:id', getOrderById);

export default router; 