import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  featured: boolean;
}

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      console.log('🔄 Starting to fetch featured products...');
      try {
        setIsLoading(true);
        console.log('📡 Making API request to /products endpoint...');
        const products = await api.get('/products');
        console.log('✅ API Response received:', products);
        
        if (Array.isArray(products)) {
          const featured = products.filter((product: Product) => product.featured);
          console.log(`✅ Found ${featured.length} featured products`);
          setProducts(featured);
          setError(null);
          setRetryCount(0); // Reset retry count on success
        } else {
          console.error('❌ Products data is not an array:', products);
          throw new Error('Invalid data format received from server');
        }
      } catch (err: any) {
        console.error('❌ Failed to load featured products:', err);
        
        // Increment retry count
        setRetryCount(prev => prev + 1);
        
        // Set error message based on the error
        if (err.message.includes('Network Error')) {
          setError('Unable to connect to the server. Please check your internet connection and try again.');
        } else if (err.response?.status === 404) {
          setError('The products service is currently unavailable. Please try again later.');
        } else {
          setError(`Unable to load featured products: ${err.message}`);
        }
        
        // Set some default products for fallback
        console.log('⚠️ Using fallback products due to API error');
        setProducts([
          {
            _id: '1',
            name: 'Classic Wooden Chair',
            description: 'Elegant wooden chair with comfortable cushioning',
            price: 19999,
            image: '/images/products/chair-1.jpg',
            featured: true
          },
          {
            _id: '2',
            name: 'Modern Dining Table',
            description: 'Sturdy dining table perfect for family gatherings',
            price: 49999,
            image: '/images/products/table-1.jpg',
            featured: true
          },
          {
            _id: '3',
            name: 'Rustic Bookshelf',
            description: 'Spacious bookshelf with multiple compartments',
            price: 29999,
            image: '/images/products/shelf-1.jpg',
            featured: true
          },
          {
            _id: '4',
            name: 'Luxury Bed Frame',
            description: 'King-size bed frame with elegant headboard',
            price: 79999,
            image: '/images/products/bed-1.jpg',
            featured: true
          }
        ]);
      } finally {
        console.log('🏁 Finished fetching featured products, loading:', isLoading);
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [retryCount]); // Re-run when retry count changes

  const handleRetry = () => {
    if (retryCount < maxRetries) {
      console.log(`🔄 Retrying fetch (attempt ${retryCount + 1}/${maxRetries})...`);
      setRetryCount(prev => prev + 1);
    } else {
      console.log('❌ Max retries reached, using fallback data');
    }
  };

  if (isLoading) {
    return (
      <div className="py-16 bg-wood-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-wood-800 mb-4">Featured Products</h2>
            <p className="text-wood-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium wooden furniture
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-wood-200 h-48 rounded-lg mb-4"></div>
                <div className="h-6 bg-wood-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-wood-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-wood-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-wood-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-wood-800 mb-4">Featured Products</h2>
            <p className="text-wood-600 max-w-2xl mx-auto mb-4">
              {error}
            </p>
            {retryCount < maxRetries && (
              <button 
                onClick={handleRetry}
                className="px-4 py-2 bg-wood-600 text-white rounded-md hover:bg-wood-700 transition-colors"
              >
                Try Again
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-w-16 aspect-h-9 bg-wood-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        console.error('❌ Image load error:', {
                          productId: product._id,
                          imageUrl: product.image
                        });
                        e.currentTarget.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif text-wood-800 mb-2">{product.name}</h3>
                    <p className="text-wood-600 mb-4">{product.description}</p>
                    <p className="text-wood-700 font-semibold">₹{product.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-wood-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-wood-800 mb-4">Featured Products</h2>
          <p className="text-wood-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium wooden furniture
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/products/${product._id}`}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9 bg-wood-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      console.error('❌ Image load error:', {
                        productId: product._id,
                        imageUrl: product.image
                      });
                      e.currentTarget.src = '/images/placeholder.jpg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-wood-800 mb-2">{product.name}</h3>
                  <p className="text-wood-600 mb-4">{product.description}</p>
                  <p className="text-wood-700 font-semibold">₹{product.price.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
