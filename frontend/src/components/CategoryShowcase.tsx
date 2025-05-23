import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@/services/api';
import { Product } from '@/types';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface CategoryWithProducts {
  name: string;
  products: Product[];
  image: string;
}

const CategoryShowcase = () => {
  const [categories, setCategories] = useState<CategoryWithProducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/products') as Product[];
        
        if (Array.isArray(response)) {
          // Group products by category
          const productsByCategory = response.reduce((acc, product) => {
            if (!acc[product.category]) {
              acc[product.category] = [];
            }
            acc[product.category].push(product);
            return acc;
          }, {} as Record<string, Product[]>);
          
          // Transform into the format we need
          const categoryData: CategoryWithProducts[] = Object.entries(productsByCategory).map(([name, products]) => ({
            name,
            products,
            image: products[0]?.images[0] || '/placeholder.jpg'
          }));
          
          // Take only the first 3 categories
          setCategories(categoryData.slice(0, 3));
        } else {
          console.error('Invalid response data:', response);
          toast.error('Failed to load categories');
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        toast.error('Failed to load categories');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();
  }, []);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-semibold mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collection of premium wooden products by category
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.name} 
              to={`/shop?category=${encodeURIComponent(category.name)}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[4/3]">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                  <h3 className="text-2xl font-medium mb-2 capitalize">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.products.length} products</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/categories" 
            className="inline-block bg-wood-600 hover:bg-wood-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
