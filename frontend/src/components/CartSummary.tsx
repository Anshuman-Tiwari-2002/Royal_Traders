import { useCart } from '@/contexts/CartContext';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const CartSummary = () => {
  const { items, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any products to your cart yet.</p>
        <Button asChild className="bg-wood-600 hover:bg-wood-700">
          <Link to="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-serif font-semibold mb-8">Shopping Cart</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Cart Items */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="hidden md:grid md:grid-cols-6 text-gray-500 text-sm mb-4">
              <div className="md:col-span-3">Product</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Total</div>
            </div>
            
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.product._id} className="py-4 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                  <div className="md:col-span-3 flex items-center">
                    <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden mr-4">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{item.product.name}</h4>
                      <button 
                        onClick={() => removeFromCart(item.product._id)}
                        className="text-sm text-red-500 flex items-center mt-2"
                      >
                        <Trash2 size={14} className="mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="md:text-center">
                    <span className="md:hidden text-gray-500 mr-2">Price: </span>
                    ₹{item.product.price.toLocaleString('en-IN')}
                  </div>
                  
                  <div className="md:text-center">
                    <div className="flex items-center md:justify-center">
                      <button 
                        className="w-8 h-8 border rounded-l flex items-center justify-center hover:bg-gray-100"
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <Input 
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product._id, parseInt(e.target.value) || 1)}
                        className="w-12 h-8 border-y text-center p-0"
                      />
                      <button 
                        className="w-8 h-8 border rounded-r flex items-center justify-center hover:bg-gray-100"
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="md:text-right font-medium">
                    <span className="md:hidden text-gray-500 mr-2">Total: </span>
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button asChild variant="outline">
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
            </div>
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <Button asChild className="w-full bg-wood-600 hover:bg-wood-700">
              <Link to="/checkout">
                Proceed to Checkout
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
