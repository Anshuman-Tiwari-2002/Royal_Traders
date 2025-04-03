
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Truck, Clock, Globe, DollarSign, Info } from "lucide-react";
import { Link } from "react-router-dom";

const Shipping = () => {
  const shippingMethods = [
    {
      title: "Standard Shipping",
      time: "3-5 business days",
      price: "$10-$20 depending on order size",
      details: "Available for most locations in the continental US."
    },
    {
      title: "Express Shipping",
      time: "1-2 business days",
      price: "$25-$45 depending on order size",
      details: "Available for most urban areas. Order must be placed before 12 PM EST."
    },
    {
      title: "International Shipping",
      time: "7-14 business days",
      price: "Varies by location and package dimensions",
      details: "Customs duties and taxes may apply and are the responsibility of the recipient."
    },
    {
      title: "Furniture Delivery & Assembly",
      time: "7-10 business days",
      price: "$50-$150 depending on product complexity",
      details: "Includes delivery to room of choice and basic assembly. Available in select areas only."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif font-semibold text-wood-800 mb-4">Shipping & Delivery</h1>
          <Separator className="mx-auto w-24 mb-6 bg-wood-400" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            Information about our shipping methods, timeframes, and policies.
          </p>
        </div>

        {/* Shipping methods */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-medium text-wood-800 mb-6">Delivery Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shippingMethods.map((method, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-medium text-lg mb-2 text-wood-800">{method.title}</h3>
                <div className="flex items-center mb-2 text-gray-600">
                  <Clock size={18} className="mr-2" />
                  <span>{method.time}</span>
                </div>
                <div className="flex items-center mb-2 text-gray-600">
                  <DollarSign size={18} className="mr-2" />
                  <span>{method.price}</span>
                </div>
                <p className="text-gray-600 text-sm">{method.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Free shipping alert */}
        <Alert className="mb-12 bg-wood-50 border-wood-200">
          <Truck className="h-5 w-5 text-wood-700" />
          <AlertTitle>Free Shipping on Orders Over $500</AlertTitle>
          <AlertDescription>
            Domestic orders over $500 qualify for free standard shipping. Some exclusions may apply for oversized items or remote locations.
          </AlertDescription>
        </Alert>

        {/* Shipping policies */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-medium text-wood-800 mb-6">Shipping Policies</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-2 flex items-center text-wood-800">
                <Truck className="mr-2" size={20} />
                Shipping Timeframes
              </h3>
              <p className="text-gray-600">
                Shipping times begin once your order has been processed and shipped, not when the order is placed. 
                Most orders are processed within 1-2 business days. During peak seasons or promotions, processing 
                times may be longer.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2 flex items-center text-wood-800">
                <Globe className="mr-2" size={20} />
                International Shipping
              </h3>
              <p className="text-gray-600">
                We ship to most countries worldwide. International customers are responsible for all customs 
                duties, import taxes, and any other fees that may be imposed by their local government. These 
                fees are not included in your purchase price or shipping cost.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2 flex items-center text-wood-800">
                <Info className="mr-2" size={20} />
                Special Orders & Backorders
              </h3>
              <p className="text-gray-600">
                Custom and made-to-order items have longer processing times, typically 2-4 weeks before shipping. 
                You'll be notified of the estimated shipping date when placing your order. If an item is backordered, 
                you will be notified of the expected availability date.
              </p>
            </div>
          </div>
        </div>

        {/* Order tracking info */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-12">
          <h2 className="text-xl font-medium text-wood-800 mb-4">Track Your Order</h2>
          <p className="text-gray-600 mb-4">
            Once your order ships, you'll receive a confirmation email with tracking information. 
            You can also track your order by:
          </p>
          <ul className="list-disc pl-5 text-gray-600 mb-4">
            <li>Logging into your account and viewing order history</li>
            <li>Contacting customer service with your order number</li>
            <li>Using the tracking link in your shipping confirmation email</li>
          </ul>
          <p className="text-gray-600">
            Please allow 24 hours for tracking information to update after receiving your shipping notification.
          </p>
        </div>
        
        {/* Questions section */}
        <div className="text-center">
          <h2 className="text-xl font-medium text-wood-800 mb-4">Have Questions?</h2>
          <p className="text-gray-600 mb-4">
            For specific shipping questions or to inquire about expedited options not listed here,
            please contact our customer service team.
          </p>
          <Link to="/contact" className="text-wood-700 hover:text-wood-800 font-medium">
            Contact Customer Service →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
