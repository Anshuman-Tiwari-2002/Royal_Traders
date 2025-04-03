
import { useState } from 'react';
import { categories } from '@/data/mockData';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-semibold text-wood-800">Browse Categories</h1>
        <p className="text-gray-600 mt-2">Explore our collection of premium wooden products by category</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Categories sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="font-medium text-lg mb-4">Product Categories</h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left ${
                      selectedCategory === category.id ? 'bg-wood-100 text-wood-800' : ''
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span>{category.name}</span>
                    <ChevronRight size={16} className="ml-auto" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Category content */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <Link to={`/shop?category=${category.id}`} key={category.id}>
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-medium text-lg mb-2">{category.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">Explore our {category.name.toLowerCase()} collection</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Browse Products
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
