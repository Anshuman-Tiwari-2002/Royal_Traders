import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, AlertCircle, Sofa, Lightbulb, Palette, Utensils, Bath, TreePine } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/services/api';

interface Category {
  _id: string;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

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
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await api.get('/categories');
        setCategories(response);
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
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <AlertCircle className="h-8 w-8 text-red-500 mb-4" />
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shop by Category</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category._id}
            to={`/shop?category=${category.slug}`}
            className="group block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              {categoryIcons[category.slug] || <Palette className="h-8 w-8" />}
              <h2 className="text-xl font-semibold ml-3">{category.name}</h2>
            </div>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <span className="text-primary-600 group-hover:underline">Shop Now</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
