import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Loader2, Star, Heart, ShoppingCart, ChevronLeft } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const response = await api.get(`/products/${id}`);
        setProduct(response);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        toast.error('Failed to load product details');
        navigate('/shop');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, navigate]);
  
  const handleAddToCart = () => {
    if (!product) return;
    
    try {
      addToCart(product, quantity);
      toast.success('Added to cart');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add to cart');
    }
  };
  
  const handleWishlistToggle = () => {
    if (!product) return;
    
    try {
      if (isInWishlist(product._id)) {
        removeFromWishlist(product._id);
        toast.success('Removed from wishlist');
      } else {
        addToWishlist(product._id);
        toast.success('Added to wishlist');
      }
    } catch (error) {
      console.error('Failed to update wishlist:', error);
      toast.error('Failed to update wishlist');
    }
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Product not found</p>
        <Button 
          onClick={() => navigate('/shop')}
          className="mt-4"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Shop
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/shop')}
        className="mb-6"
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Shop
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.slice(1).map((image, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={image} 
                  alt={`${product.name} ${index + 2}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-serif font-semibold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'}`}
              />
            ))}
            <span className="ml-2 text-gray-500">({product.rating})</span>
          </div>
          <p className="text-2xl font-semibold text-wood-800 mb-6">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <div className="flex items-center space-x-4 mb-8">
            <div className="flex items-center border rounded-lg">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="px-4 py-2">{quantity}</span>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
            <Button 
              onClick={handleAddToCart}
              className="flex-1 bg-wood-600 hover:bg-wood-700"
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleWishlistToggle}
              className={isInWishlist(product._id) ? 'text-red-500' : ''}
            >
              <Heart className={`h-4 w-4 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <div className="prose max-w-none">
                <p>{product.description}</p>
              </div>
            </TabsContent>
            <TabsContent value="specifications">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="border-b pb-2">
                    <dt className="font-medium text-gray-500">{key}</dt>
                    <dd className="mt-1">{value}</dd>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
