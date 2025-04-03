
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { products, categories } from '@/data/mockData';
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

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  
  const [allProducts, setAllProducts] = useState<Product[]>(products);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOption, setSortOption] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
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
    navigate(`/shop${params.toString() ? `?${params.toString()}` : ''}`, { replace: true });
  }, [selectedCategory, navigate]);
  
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
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif font-semibold text-wood-800 mb-4">Our Collection</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handcrafted wooden products, each piece tells a unique story of craftsmanship and quality.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="w-full lg:w-64 hidden lg:block">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium text-lg">Filters</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-sm text-wood-600 hover:text-wood-800"
                >
                  Clear All
                </Button>
              </div>
              
              {/* Categories */}
              <Accordion type="single" collapsible defaultValue="categories">
                <AccordionItem value="categories">
                  <AccordionTrigger className="py-2">Categories</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`category-${category.id}`}
                            checked={selectedCategory === category.name.toLowerCase()}
                            onCheckedChange={() => handleCategoryChange(category.name.toLowerCase())}
                          />
                          <label
                            htmlFor={`category-${category.id}`}
                            className="text-sm cursor-pointer"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              {/* Price Range */}
              <Accordion type="single" collapsible defaultValue="price">
                <AccordionItem value="price">
                  <AccordionTrigger className="py-2">Price</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Slider
                        defaultValue={[0, 1000]}
                        max={1000}
                        step={10}
                        value={[priceRange[0], priceRange[1]]}
                        onValueChange={handlePriceRangeChange}
                        className="my-6"
                      />
                      <div className="flex justify-between">
                        <span className="text-sm">${priceRange[0]}</span>
                        <span className="text-sm">${priceRange[1]}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          
          <div className="flex-1">
            {/* Mobile Filters Toggle */}
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
              >
                <SlidersHorizontal size={16} className="mr-2" />
                Filters
              </Button>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid2X2 size={16} />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List size={16} />
                </Button>
              </div>
            </div>
            
            {/* Mobile Filters Panel */}
            {showFilters && (
              <div className="lg:hidden bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-medium text-lg">Filters</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowFilters(false)}
                  >
                    <X size={18} />
                  </Button>
                </div>
                
                {/* Categories */}
                <Accordion type="single" collapsible defaultValue="categories">
                  <AccordionItem value="categories">
                    <AccordionTrigger className="py-2">Categories</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mobile-category-${category.id}`}
                              checked={selectedCategory === category.name.toLowerCase()}
                              onCheckedChange={() => handleCategoryChange(category.name.toLowerCase())}
                            />
                            <label
                              htmlFor={`mobile-category-${category.id}`}
                              className="text-sm cursor-pointer"
                            >
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                {/* Price Range */}
                <Accordion type="single" collapsible defaultValue="price">
                  <AccordionItem value="price">
                    <AccordionTrigger className="py-2">Price</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <Slider
                          defaultValue={[0, 1000]}
                          max={1000}
                          step={10}
                          value={[priceRange[0], priceRange[1]]}
                          onValueChange={handlePriceRangeChange}
                          className="my-6"
                        />
                        <div className="flex justify-between">
                          <span className="text-sm">${priceRange[0]}</span>
                          <span className="text-sm">${priceRange[1]}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="flex justify-between mt-6">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={clearFilters}
                  >
                    Clear All
                  </Button>
                  <Button 
                    onClick={() => setShowFilters(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}
            
            {/* Sort and View Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500 mb-3 sm:mb-0">
                Showing {filteredProducts.length} results
              </div>
              <div className="flex items-center space-x-4">
                <div className="hidden lg:flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid2X2 size={16} />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                  >
                    <List size={16} />
                  </Button>
                </div>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                    <SelectItem value="name-a-z">Name: A to Z</SelectItem>
                    <SelectItem value="name-z-a">Name: Z to A</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                          onClick={() => console.log('Add to cart:', product._id)}
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
