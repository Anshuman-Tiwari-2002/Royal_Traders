import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, AlertCircle, Sofa, Lightbulb, Palette, Utensils, Bath, TreePine } from 'lucide-react';
import { toast } from 'sonner';
import { mockCategories, Category } from '@/data/mockCategories';

// Map of category slugs to icons
const categoryIcons: Record<string, React.ReactNode> = {
  'furniture': <Sofa className="h-8 w-8" />,
  'lighting': <Lightbulb className="h-8 w-8" />,
  'decor': <Palette className="h-8 w-8" />,
  'kitchen-dining': <Utensils className="h-8 w-8" />,
  'bathroom': <Bath className="h-8 w-8" />,
  'outdoor': <TreePine className="h-8 w-8" />
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate API call with a delay
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Use mock data
        setCategories(mockCategories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setError('Failed to load categories. Please try again later.');
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
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-center">
          <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }
  
  if (categories.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-serif font-semibold mb-8">Shop by Category</h1>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-600">No categories found. Please check back later.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-serif font-semibold mb-8">Shop by Category</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link 
            key={category._id} 
            to={`/shop?category=${encodeURIComponent(category.slug)}`}
            className="group block"
          >
            <div className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white h-full">
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="bg-wood-50 p-3 rounded-full mr-4 text-wood-600 group-hover:text-wood-700 transition-colors">
                    {categoryIcons[category.slug] || <Palette className="h-8 w-8" />}
                  </div>
                  <h2 className="text-2xl font-medium text-wood-600 group-hover:text-wood-700 transition-colors">
                    {category.name}
                  </h2>
                </div>
                <p className="text-gray-600 flex-grow">{category.description}</p>
                <div className="mt-4 text-wood-600 font-medium group-hover:text-wood-700 transition-colors">
                  Shop Now →
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-wood-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
