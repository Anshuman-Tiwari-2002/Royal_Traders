
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RefreshCw, ShieldCheck, AlertCircle, BadgeInfo } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Returns = () => {
  const returnSteps = [
    {
      title: "Request a Return",
      description: "Log into your account and submit a return request, or contact our customer service team. You'll need your order number and the reason for return."
    },
    {
      title: "Receive Return Authorization",
      description: "We'll review your request and send a return authorization with detailed instructions and a return shipping label if applicable."
    },
    {
      title: "Package Your Return",
      description: "Carefully pack the item in its original packaging if possible. Include all components, accessories, and documentation that came with the product."
    },
    {
      title: "Ship Your Return",
      description: "Attach the provided shipping label and drop off at the specified carrier location. We recommend getting a tracking number for your records."
    },
    {
      title: "Refund Processing",
      description: "Once we receive and inspect your return, we'll process your refund. This typically takes 5-7 business days to appear on your original payment method."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif font-semibold text-wood-800 mb-4">Returns & Exchanges</h1>
          <Separator className="mx-auto w-24 mb-6 bg-wood-400" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our hassle-free return policy gives you peace of mind with every purchase.
          </p>
        </div>
        
        {/* Return Policy Summary */}
        <div className="bg-wood-50 p-6 rounded-lg mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-medium text-wood-800 mb-2">Our Return Policy</h2>
            <p className="text-gray-600">
              We offer a 30-day return window for most items in their original condition.
            </p>
          </div>
          <ShieldCheck className="h-16 w-16 text-wood-700" />
        </div>
        
        {/* Return Process Steps */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-medium text-wood-800 mb-6">Return Process</h2>
          <div className="space-y-6">
            {returnSteps.map((step, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-6 relative">
                <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-wood-600 text-white flex items-center justify-center font-medium">
                  {index + 1}
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Return Conditions */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-medium text-wood-800 mb-6">Return Conditions</h2>
          
          <Alert className="mb-6 border-wood-200 bg-wood-50">
            <BadgeInfo className="h-5 w-5 text-wood-700" />
            <AlertDescription>
              All returns must be in their original condition, unused, unassembled, and with all original packaging and documentation.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-2 text-wood-800">Standard Items</h3>
              <p className="text-gray-600">
                Most in-stock items can be returned within 30 days of delivery. A 10% restocking fee may apply 
                to returns without original packaging or for items showing signs of use.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2 text-wood-800">Custom & Special Orders</h3>
              <p className="text-gray-600">
                Custom-made items, personalized products, and special orders cannot be returned unless they're 
                defective. These items are specifically crafted to your specifications.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2 text-wood-800">Sale & Clearance Items</h3>
              <p className="text-gray-600">
                Items purchased on clearance or marked as "Final Sale" cannot be returned. Sale items may be 
                returned within 14 days with original receipt, and will be refunded at the sale purchase price.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2 text-wood-800">Defective Items</h3>
              <p className="text-gray-600">
                If you receive a defective product, please contact us within 7 days of delivery. We'll arrange 
                for repair, replacement, or refund at no additional cost to you.
              </p>
            </div>
          </div>
        </div>
        
        {/* Exchanges */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-medium text-wood-800 mb-6">Exchanges</h2>
          <p className="text-gray-600 mb-4">
            We're happy to exchange items for a different size, color, or style, subject to availability. 
            The exchange process follows the same steps as returns, with these additional notes:
          </p>
          <ul className="list-disc pl-5 text-gray-600 mb-4 space-y-2">
            <li>If the exchanged item has a higher price, you'll be charged the difference</li>
            <li>If the exchanged item has a lower price, the difference will be refunded</li>
            <li>Shipping costs for exchanges are the responsibility of the customer unless the original item was defective</li>
            <li>Exchange requests must be made within the same 30-day return window</li>
          </ul>
        </div>
        
        {/* Return Shipping */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-medium text-wood-800 mb-6">Return Shipping</h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-start mb-4">
              <AlertCircle className="mr-3 h-5 w-5 text-amber-500 mt-1" />
              <div>
                <h3 className="font-medium text-lg mb-1">Important Shipping Information</h3>
                <p className="text-gray-600">
                  For standard returns, customers are responsible for return shipping costs unless the item was 
                  defective, damaged, or shipped incorrectly.
                </p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">
              For large furniture items, please contact our customer service team to arrange for pickup. 
              Special handling fees may apply for large or bulky items.
            </p>
            
            <p className="text-gray-600">
              We recommend using a trackable shipping method to ensure your return can be tracked and verified.
            </p>
          </div>
        </div>
        
        {/* Start Return CTA */}
        <div className="text-center bg-wood-50 p-8 rounded-lg">
          <h2 className="text-xl font-medium text-wood-800 mb-4">Ready to Start Your Return?</h2>
          <p className="text-gray-600 mb-6">
            Our customer service team is here to help make the return process as smooth as possible.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button className="bg-wood-700 hover:bg-wood-800">
              <RefreshCw className="mr-2" size={18} />
              Start Return Process
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">
                Contact Customer Service
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Returns;
