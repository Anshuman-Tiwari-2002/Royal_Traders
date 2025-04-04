import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { 
  Grid2X2, 
  List, 
  SlidersHorizontal,
  ChevronDown,
  X,
  Star,
  ShoppingCart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { api } from '@/lib/api';
import { toast } from 'sonner';

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOption, setSortOption] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>([]);
  
  const { addToCart } = useCart();
  
  // Fetch products from the backend
  useEffect(() => {
    let isMounted = true;
    
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/products');
        
        if (isMounted && Array.isArray(response)) {
          setAllProducts(response);
          setFilteredProducts(response);
          
          // Extract unique categories from products
          const uniqueCategories = [...new Set(response.map(product => product.category))];
          setCategories(uniqueCategories);
        } else if (isMounted) {
          console.error('Invalid response data:', response);
          toast.error('Failed to load products. Invalid response format.');
        }
      } catch (error) {
        if (isMounted) {
          console.error('Failed to fetch products:', error);
          toast.error('Failed to load products');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchProducts();
    
    return () => {
      isMounted = false;
    };
  }, []);
  
  // Apply filters
  useEffect(() => {
    let filtered = [...allProducts];
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Sort products
    switch (sortOption) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-a-z':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-z-a':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'featured' or any other option
        filtered.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
        break;
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, sortOption, allProducts]);
  
  // Update URL when category changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) {
      params.set('category', selectedCategory);
    }
    
    // Use replace: true to prevent adding to history stack
    const newUrl = `/shop${params.toString() ? `?${params.toString()}` : ''}`;
    if (location.pathname + location.search !== newUrl) {
      navigate(newUrl, { replace: true });
    }
  }, [selectedCategory, navigate, location.pathname, location.search]);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };
  
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };
  
  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 1000]);
    setSortOption('featured');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-serif font-semibold mb-8">Shop</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">Filters</h2>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-wood-600 hover:text-wood-700"
                >
                  Clear All
                </button>
              </div>
              
              {/* Category Filter */}
              <Accordion type="single" collapsible className="mb-6">
                <AccordionItem value="category">
                  <AccordionTrigger className="text-base">Category</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <Checkbox 
                            id={category}
                            checked={selectedCategory === category}
                            onCheckedChange={() => handleCategoryChange(category)}
                          />
                          <label 
                            htmlFor={category}
                            className="ml-2 text-sm cursor-pointer"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              {/* Price Range Filter */}
              <Accordion type="single" collapsible>
                <AccordionItem value="price">
                  <AccordionTrigger className="text-base">Price Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Slider 
                        min={0} 
                        max={1000} 
                        step={10}
                        value={priceRange}
                        onValueChange={handlePriceRangeChange}
                        className="my-4"
                      />
                      <div className="flex justify-between text-sm">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center mb-4 sm:mb-0">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center text-gray-700 mr-4"
                >
                  <SlidersHorizontal size={18} className="mr-2" />
                  <span className="hidden sm:inline">Filters</span>
                </button>
                <span className="text-gray-500">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">Sort by:</span>
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                      <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                      <SelectItem value="name-a-z">Name: A to Z</SelectItem>
                      <SelectItem value="name-z-a">Name: Z to A</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex border rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
                  >
                    <Grid2X2 size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Products */}
            {isLoading ? (
              <div className="text-center py-12">
                <p>Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p>No products found matching your criteria.</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col md:flex-row">
                    <div className="md:w-1/3 relative">
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="p-6 flex flex-col justify-between md:w-2/3">
                      <div>
                        <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                        <p className="text-gray-500 mb-4">{product.description}</p>
                        <div className="flex items-center mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'}`}
                            />
                          ))}
                          <span className="ml-2 text-gray-500">({product.rating})</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xl font-semibold text-wood-800">${product.price.toFixed(2)}</span>
                        <Button 
                          onClick={() => addToCart(product, 1)}
                          className="bg-wood-600 hover:bg-wood-700"
                        >
                          <ShoppingCart size={16} className="mr-2" /> Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
