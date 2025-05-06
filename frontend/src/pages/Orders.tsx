import React, { useEffect, useState } from 'react';
import api from '@/lib/api';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders'); // Replace with your API endpoint
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Orders</h1>
        <div className="bg-white shadow sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {orders.map((order: any) => (
              <li key={order.id} className="px-4 py-4 sm:px-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-indigo-600">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">Date: {order.date}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{order.total}</p>
                    <p className={`text-sm ${order.status === 'Delivered' ? 'text-green-600' : 'text-gray-500'}`}>
                      {order.status}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Orders;