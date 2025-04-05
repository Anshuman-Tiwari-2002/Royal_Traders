import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

interface Category {
  _id: string;
  name: string;
  description: string;
  image: string;
}

const CategoryShowcase: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    const fetchCategories = async () => {
      console.log('🔄 Starting to fetch categories...');
      try {
        setLoading(true);
        console.log('📡 Making API request to /categories endpoint...');
        const response = await api.get('/categories');
        console.log('✅ API Response:', {
          status: response.status,
          statusText: response.statusText,
          data: response.data
        });
        setCategories(response.data);
        setError(null);
        setRetryCount(0); // Reset retry count on success
      } catch (err: any) {
        console.error('❌ Failed to fetch categories:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          statusText: err.response?.statusText,
          config: {
            url: err.config?.url,
            method: err.config?.method,
            headers: err.config?.headers
          }
        });
        
        // Increment retry count
        setRetryCount(prev => prev + 1);
        
        // Set error message based on the error
        if (err.message.includes('Network Error')) {
          setError('Unable to connect to the server. Please check your internet connection and try again.');
        } else if (err.response?.status === 404) {
          setError('The categories service is currently unavailable. Please try again later.');
        } else {
          setError(`Unable to load categories: ${err.message}`);
        }
        
        // Set some default categories for fallback
        console.log('⚠️ Using fallback categories due to API error');
        setCategories([
          {
            _id: '1',
            name: 'Living Room',
            description: 'Elegant furniture for your living space',
            image: '/images/categories/living-room.jpg'
          },
          {
            _id: '2',
            name: 'Bedroom',
            description: 'Comfortable and stylish bedroom furniture',
            image: '/images/categories/bedroom.jpg'
          },
          {
            _id: '3',
            name: 'Dining Room',
            description: 'Beautiful dining sets for your home',
            image: '/images/categories/dining-room.jpg'
          }
        ]);
      } finally {
        console.log('🏁 Finished fetching categories, loading:', loading);
        setLoading(false);
      }
    };

    fetchCategories();
  }, [retryCount]); // Re-run when retry count changes

  // Log state changes
  useEffect(() => {
    console.log('📊 CategoryShowcase state updated:', {
      categoriesCount: categories.length,
      loading,
      error,
      categories
    });
  }, [categories, loading, error]);

  const handleRetry = () => {
    if (retryCount < maxRetries) {
      console.log(`🔄 Retrying fetch (attempt ${retryCount + 1}/${maxRetries})...`);
      setRetryCount(prev => prev + 1);
    } else {
      console.log('❌ Max retries reached, using fallback data');
    }
  };

  if (loading) {
    console.log('⌛ Rendering loading state...');
    return (
      <div className="py-16 bg-wood-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-wood-200 h-48 rounded-lg mb-4"></div>
                <div className="h-6 bg-wood-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-wood-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.log('⚠️ Rendering error state:', error);
    return (
      <div className="py-16 bg-wood-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-wood-800">
            <h2 className="text-2xl font-serif mb-4">Our Categories</h2>
            <p className="text-wood-600 mb-4">{error}</p>
            {retryCount < maxRetries && (
              <button 
                onClick={handleRetry}
                className="px-4 py-2 bg-wood-600 text-white rounded-md hover:bg-wood-700 transition-colors"
              >
                Try Again
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`/categories/${category._id}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-w-16 aspect-h-9 bg-wood-100">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        console.error('❌ Image load error:', {
                          categoryId: category._id,
                          imageUrl: category.image
                        });
                        e.currentTarget.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif text-wood-800 mb-2">{category.name}</h3>
                    <p className="text-wood-600">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  console.log('✨ Rendering categories successfully');
  return (
    <div className="py-16 bg-wood-50">
      <div className="container mx-auto px-4">
        <div className="text-center text-wood-800 mb-12">
          <h2 className="text-3xl font-serif mb-4">Explore Our Collections</h2>
          <p className="text-wood-600 max-w-2xl mx-auto">
            Discover our carefully curated categories of premium wooden furniture
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/categories/${category._id}`}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9 bg-wood-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      console.error('❌ Image load error:', {
                        categoryId: category._id,
                        imageUrl: category.image
                      });
                      e.currentTarget.src = '/images/placeholder.jpg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-wood-800 mb-2">{category.name}</h3>
                  <p className="text-wood-600">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryShowcase; 