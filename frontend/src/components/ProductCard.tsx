import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { Product } from '../types/product';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isInWishlist = wishlist.some(item => item._id === product._id);

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the wishlist button
    try {
      if (isInWishlist) {
        await removeFromWishlist(product._id);
      } else {
        await addToWishlist(product._id);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart(product, 1);
      toast.success(`Added ${product.name} to cart`);
    } catch (error) {
      console.error('Failed to add product to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${product._id}`} className="block">
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <button
            onClick={handleWishlistClick}
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isInWishlist ? 'text-red-500' : 'text-gray-500'
            } hover:bg-white/80 transition-colors duration-200`}
            title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={isInWishlist ? 'fill-current' : ''} size={20} />
          </button>
        </div>
        <CardHeader>
          <CardTitle className="text-lg">{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm mb-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
            <span className="text-sm text-gray-500">Stock: {product.stock}</span>
          </div>
        </CardContent>
      </Link>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
