import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authenticatedFetch } from '../services/authService';
import { API_BASE_URL } from '../config';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

interface WishlistItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    image: string;
    price: number;
    description: string;
  };
}

export function Wishlist() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await authenticatedFetch(`${API_BASE_URL}/wishlist`);
        if (response.ok) {
          const data = await response.json();
          setWishlist(data);
        } else {
          toast.error('Failed to fetch wishlist');
        }
      } catch (error) {
        toast.error('An error occurred while fetching wishlist');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      const response = await authenticatedFetch(`${API_BASE_URL}/wishlist/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setWishlist(wishlist.filter(item => item.product._id !== productId));
        toast.success('Item removed from wishlist');
      } else {
        toast.error('Failed to remove item from wishlist');
      }
    } catch (error) {
      toast.error('An error occurred while removing item from wishlist');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading wishlist...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-gray-500">Your wishlist is empty</p>
            <Button
              onClick={() => navigate('/shop')}
              className="mt-4 mx-auto block"
            >
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <Card key={item._id}>
              <CardHeader>
                <div className="relative">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => handleRemoveFromWishlist(item.product._id)}
                  >
                    ×
                  </Button>
                </div>
                <CardTitle className="mt-4">{item.product.name}</CardTitle>
                <CardDescription>${item.product.price.toFixed(2)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{item.product.description}</p>
                <Button
                  className="w-full"
                  onClick={() => navigate(`/product/${item.product._id}`)}
                >
                  View Product
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 