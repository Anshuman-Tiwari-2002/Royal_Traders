import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          </div>
          
          <h1 className="text-3xl font-serif font-semibold mb-4">Thank You for Your Order!</h1>
          <p className="text-gray-600 mb-8">
            Your order has been successfully placed. We'll send you an email confirmation with order details and tracking information.
          </p>
          
          <div className="space-y-4">
            <Button asChild className="bg-wood-600 hover:bg-wood-700">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 