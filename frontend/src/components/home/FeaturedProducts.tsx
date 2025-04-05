import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { api } from '@/services/api';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/products') as Product[];
        const featured = response.filter(product => product.featured).slice(0, 4);
        setProducts(featured);
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-wood-600" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="group"
        >
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h3 className="font-medium text-gray-900 group-hover:text-wood-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-500">₹{product.price.toLocaleString('en-IN')}</p>
        </Link>
      ))}
    </div>
  );
}; 