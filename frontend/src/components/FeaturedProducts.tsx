import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';
import { Loader2 } from 'lucide-react';
import api from '@/services/api';
import { toast } from 'sonner';

const FeaturedProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true);
        const products = await api.get('/products');
        if (Array.isArray(products)) {
          const featured = products.filter((product: Product) => product.featured);
          setFeaturedProducts(featured);
        } else {
          console.error('Invalid response data:', products);
          setError('Failed to load featured products');
          toast.error('Failed to load featured products');
        }
      } catch (err) {
        console.error('Failed to load featured products:', err);
        setError('Failed to load featured products');
        toast.error('Failed to load featured products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 min-h-[200px] flex items-center justify-center">
        {error}
      </div>
    );
  }

  if (featuredProducts.length === 0) {
    return (
      <div className="text-center text-gray-500 min-h-[200px] flex items-center justify-center">
        No featured products available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default FeaturedProducts;
