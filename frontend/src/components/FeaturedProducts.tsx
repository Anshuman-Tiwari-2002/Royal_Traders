import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { products } from '@/data/mockData';
import { Product } from '@/types/product';
import { Loader2 } from 'lucide-react';

const FeaturedProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      // Simulate loading delay
      setTimeout(() => {
        const filtered = products.filter(product => product.featured);
        setFeaturedProducts(filtered);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to load featured products');
      setIsLoading(false);
    }
  }, []);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-semibold text-wood-800 mb-4">Featured Collection</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked selection of premium wooden products, crafted with attention to detail and designed to last generations.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-wood-600" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 min-h-[200px] flex items-center justify-center">
            {error}
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center text-gray-600 min-h-[200px] flex items-center justify-center">
            No featured products available
          </div>
        ) : (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
