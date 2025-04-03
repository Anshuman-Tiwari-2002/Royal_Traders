import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authenticatedFetch } from '../services/authService';
import { API_BASE_URL } from '../config';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from 'sonner';

interface Order {
  _id: string;
  orderNumber: string;
  createdAt: string;
  status: string;
  total: number;
  items: Array<{
    product: {
      name: string;
      image: string;
    };
    quantity: number;
    price: number;
  }>;
}

export function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await authenticatedFetch(`${API_BASE_URL}/orders`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          toast.error('Failed to fetch orders');
        }
      } catch (error) {
        toast.error('An error occurred while fetching orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-gray-500">No orders found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order._id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Order #{order.orderNumber}</CardTitle>
                    <CardDescription>
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${order.total.toFixed(2)}</div>
                    <div className={`text-sm ${
                      order.status === 'completed' ? 'text-green-600' :
                      order.status === 'pending' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <div className="font-medium">{item.product.name}</div>
                        <div className="text-sm text-gray-500">
                          Quantity: {item.quantity} × ${item.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 