
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import { 
  ShoppingCart, 
  Heart,
  Truck, 
  RefreshCcw, 
  Shield,
  ChevronLeft,
  ChevronRight,
  Star,
  Minus,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Product } from '@/types';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-serif font-semibold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the product you're looking for.
        </p>
        <Button asChild className="bg-wood-600 hover:bg-wood-700">
          <Link to="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }
  
  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= product.stockQuantity) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <Link to="/" className="text-gray-500 hover:text-wood-600">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/shop" className="text-gray-500 hover:text-wood-600">Shop</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link 
            to={`/shop?category=${product.category}`} 
            className="text-gray-500 hover:text-wood-600 capitalize"
          >
            {product.category}
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-700">{product.name}</span>
        </nav>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product Images */}
            <div className="p-6">
              <div className="relative pb-[100%] overflow-hidden rounded-lg mb-4">
                <img 
                  src={product.images[activeImageIndex] || product.images[0]} 
                  alt={product.name} 
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative pb-[100%] overflow-hidden rounded-md ${index === activeImageIndex ? 'ring-2 ring-wood-600' : 'opacity-70 hover:opacity-100'}`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - View ${index + 1}`} 
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="p-6 flex flex-col">
              <h1 className="text-3xl font-serif font-semibold mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-gray-500">({product.rating})</span>
              </div>
              
              {/* Price */}
              <div className="text-2xl font-semibold text-wood-800 mb-4">
                ${product.price.toFixed(2)}
              </div>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="font-medium text-gray-700">Availability:</div>
                {product.stockQuantity > 0 ? (
                  <span className="text-green-600 font-medium">In Stock ({product.stockQuantity} available)</span>
                ) : (
                  <span className="text-red-500 font-medium">Out of Stock</span>
                )}
              </div>
              
              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="font-medium text-gray-700">Quantity:</div>
                <div className="flex items-center">
                  <button 
                    className="w-10 h-10 border rounded-l flex items-center justify-center hover:bg-gray-100"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <Input 
                    type="number"
                    min="1"
                    max={product.stockQuantity}
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-16 h-10 border-y text-center p-0 rounded-none"
                  />
                  <button 
                    className="w-10 h-10 border rounded-r flex items-center justify-center hover:bg-gray-100"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stockQuantity}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Button 
                  className="flex-1 bg-wood-600 hover:bg-wood-700"
                  onClick={handleAddToCart}
                  disabled={product.stockQuantity === 0}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
                <Button variant="outline" className="flex-1">
                  <Heart className="mr-2 h-4 w-4" /> Add to Wishlist
                </Button>
              </div>
              
              {/* Features */}
              <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
                <div className="flex items-center space-x-3">
                  <Truck className="text-wood-600" size={20} />
                  <span className="text-sm">Free shipping over $100</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RefreshCcw className="text-wood-600" size={20} />
                  <span className="text-sm">30-day returns</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="text-wood-600" size={20} />
                  <span className="text-sm">2-year warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="bg-white p-6 rounded-lg shadow-sm mt-4">
              <h3 className="text-xl font-medium mb-4">Product Description</h3>
              <p className="text-gray-700">
                {product.description}
              </p>
              <p className="text-gray-700 mt-4">
                Our {product.name.toLowerCase()} is meticulously crafted by skilled artisans using traditional techniques passed down through generations. Each piece showcases the natural beauty of the wood grain, making it not just a functional item but also a work of art that adds warmth and character to your space.
              </p>
              <p className="text-gray-700 mt-4">
                We source our wood responsibly from sustainable forests, ensuring that our products are not only beautiful but also environmentally conscious. The timber undergoes a careful selection process to ensure only the highest quality materials are used in our creations.
              </p>
            </TabsContent>
            <TabsContent value="specifications" className="bg-white p-6 rounded-lg shadow-sm mt-4">
              <h3 className="text-xl font-medium mb-4">Product Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                <div className="grid grid-cols-2">
                  <div className="font-medium text-gray-700">Material</div>
                  <div className="text-gray-600">Solid Wood</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="font-medium text-gray-700">Finish</div>
                  <div className="text-gray-600">Natural Oil</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="font-medium text-gray-700">Weight</div>
                  <div className="text-gray-600">15 kg</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="font-medium text-gray-700">Dimensions</div>
                  <div className="text-gray-600">120 x 80 x 75 cm</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="font-medium text-gray-700">Origin</div>
                  <div className="text-gray-600">Handmade in USA</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="font-medium text-gray-700">Wood Type</div>
                  <div className="text-gray-600">Oak / Walnut / Maple</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="bg-white p-6 rounded-lg shadow-sm mt-4">
              <h3 className="text-xl font-medium mb-4">Customer Reviews</h3>
              <div className="flex items-center mb-6">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="ml-2 font-medium">{product.rating} out of 5</span>
              </div>
              
              <Button className="bg-wood-600 hover:bg-wood-700 mb-8">
                Write a Review
              </Button>
              
              <div className="space-y-6">
                <div className="border-t pt-6">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < 5 ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">John D.</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-500">1 month ago</span>
                  </div>
                  <p className="text-gray-700">
                    Excellent quality and craftsmanship! The {product.name.toLowerCase()} exceeded my expectations. The wood grain is beautiful and the finish is flawless.
                  </p>
                </div>
                
                <div className="border-t pt-6">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < 4 ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">Sarah M.</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-500">2 months ago</span>
                  </div>
                  <p className="text-gray-700">
                    Very happy with my purchase. The quality is outstanding and it looks even better in person than in the photos.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-serif font-semibold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <Link to={`/product/${product.id}`} className="block relative pb-[100%]">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  </Link>
                  <div className="p-4">
                    <Link to={`/product/${product.id}`} className="block">
                      <h3 className="font-medium hover:text-wood-600 transition-colors">{product.name}</h3>
                    </Link>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-semibold text-wood-800">${product.price.toFixed(2)}</span>
                      <div className="flex items-center">
                        <Star className="fill-yellow-400 stroke-yellow-400 w-4 h-4" />
                        <span className="ml-1 text-sm">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
