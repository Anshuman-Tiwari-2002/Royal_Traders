
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, HelpCircle, ShieldCheck, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FAQ = () => {
  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "Domestic orders typically take 3-5 business days. International orders can take 7-14 business days depending on the destination and customs processing."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items in their original condition. Custom orders and clearance items may have different policies. Please see our Returns & Exchanges page for complete details."
    },
    {
      question: "Do you offer installation services?",
      answer: "Yes, we offer professional installation services in select areas. The cost depends on the product and your location. Please contact our customer service team for a quote."
    },
    {
      question: "How do I care for my wooden furniture?",
      answer: "We recommend dusting regularly with a soft cloth. Use quality furniture polish or oil every 3-6 months. Keep wooden furniture away from direct sunlight and heat sources. For spills, clean immediately with a slightly damp cloth and dry thoroughly."
    },
    {
      question: "Can I customize the size or finish of a product?",
      answer: "Yes, we offer customization options for many of our products. Please contact our customer service team with your specific requirements for a quote and timeline."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by location. Please note that customers are responsible for any import duties or taxes."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with tracking information. You can also log into your account on our website to view order status and tracking details."
    },
    {
      question: "What warranty do your products carry?",
      answer: "Most of our furniture items come with a 1-3 year warranty against manufacturing defects. Premium collections may have extended warranties of up to 5 years. Warranty details are specified on each product page."
    }
  ];

  const categories = [
    {
      title: "Shipping & Delivery",
      icon: Package,
      path: "/shipping",
    },
    {
      title: "Returns & Exchanges",
      icon: ShieldCheck,
      path: "/returns",
    },
    {
      title: "Terms & Conditions",
      icon: HelpCircle,
      path: "/terms",
    },
    {
      title: "Contact Support",
      icon: MessageCircle,
      path: "/contact",
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif font-semibold text-wood-800 mb-4">Frequently Asked Questions</h1>
          <Separator className="mx-auto w-24 mb-6 bg-wood-400" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our products, services, and policies.
          </p>
        </div>
        
        {/* Quick navigation cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {categories.map((category) => (
            <Link to={category.path} key={category.title} className="no-underline">
              <div className="bg-wood-50 rounded-lg p-6 text-center hover:bg-wood-100 transition-colors">
                <category.icon className="mx-auto h-8 w-8 text-wood-700 mb-3" />
                <h3 className="font-medium text-wood-800">{category.title}</h3>
              </div>
            </Link>
          ))}
        </div>
        
        {/* FAQ accordion */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-medium text-wood-800 mb-6">Common Questions</h2>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        {/* Still need help section */}
        <div className="mt-12 text-center p-8 bg-wood-50 rounded-lg">
          <h2 className="text-xl font-medium text-wood-800 mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 mb-6">
            Our customer service team is here to help with any questions not answered above.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button variant="default" className="bg-wood-700 hover:bg-wood-800" asChild>
              <Link to="/contact">
                <MessageCircle className="mr-2" size={18} />
                Contact Us
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="tel:5551234567">
                Call (555) 123-4567
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
