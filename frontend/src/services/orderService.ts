import { api } from './api';

export interface Order {
  id: string;
  date: string;
  total: string;
  status: string;
}

export const orderService = {
  // Fetch all orders
  getOrders: async (): Promise<Order[]> => {
    const response = await api.get('/orders');
    return response.data; // Access the data property of the response
  },

  // Fetch a single order by ID (optional)
  getOrderById: async (id: string): Promise<Order> => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
};