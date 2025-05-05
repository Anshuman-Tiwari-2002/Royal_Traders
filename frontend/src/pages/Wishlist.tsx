import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  image: string;
}

const Wishlist: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchWishlist = async () => {
      try {
        const response = await api.get('/users/wishlist');
        setItems(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch wishlist');
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user, navigate]);

  const removeFromWishlist = async (productId: string) => {
    try {
      await api.delete(`/users/wishlist/${productId}`);
      setItems(items.filter(item => item._id !== productId));
      toast.success('Product removed from wishlist');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to remove item');
    }
  };

  const addToCart = async (productId: string) => {
    try {
      await api.post('/cart', { productId, quantity: 1 });
      toast.success('Product added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add product to cart');
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-4">Add products to your wishlist to save them for later</p>
          <Link to="/shop" className="text-wood-600 hover:text-wood-700">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-md p-4">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-4">${item.price}</p>
            <div className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => addToCart(item._id)}
                className="flex items-center"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFromWishlist(item._id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist; 