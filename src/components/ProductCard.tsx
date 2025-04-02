
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 h-full flex flex-col hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative pb-[100%] overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 ease-in-out ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          {product.featured && (
            <span className="absolute top-2 left-2 bg-wood-600 text-white text-xs font-semibold px-2 py-1 rounded">Featured</span>
          )}
        </Link>
        
        <div className={`absolute right-2 top-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Button variant="outline" size="icon" className="rounded-full bg-white">
            <Heart size={18} className="text-gray-600 hover:text-red-500" />
          </Button>
        </div>
      </div>
      
      <CardContent className="pt-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product.id}`} className="group">
            <h3 className="font-medium text-lg group-hover:text-wood-600 transition-colors">{product.name}</h3>
          </Link>
          <div className="flex items-center">
            <Star className="fill-yellow-400 stroke-yellow-400 w-4 h-4 mr-1" />
            <span className="text-sm">{product.rating}</span>
          </div>
        </div>
        <p className="text-lg font-semibold text-wood-800">${product.price.toFixed(2)}</p>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">{product.description}</p>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          className="w-full bg-wood-600 hover:bg-wood-700"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
