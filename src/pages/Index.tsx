
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoryShowcase from '@/components/CategoryShowcase';
import TestimonialSection from '@/components/TestimonialSection';

const Index = () => {
  return (
    <div>
      <HeroSection />
      <CategoryShowcase />
      <FeaturedProducts />
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-wood-50 p-8 rounded-lg flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-wood-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-wood-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Each piece is meticulously crafted using the finest materials and time-honored techniques.
              </p>
            </div>
            <div className="bg-wood-50 p-8 rounded-lg flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-wood-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-wood-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                From our workshop to your doorstep with care and efficiency. Most orders ship within 48 hours.
              </p>
            </div>
            <div className="bg-wood-50 p-8 rounded-lg flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-wood-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-wood-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Sustainable Practices</h3>
              <p className="text-gray-600">
                We're committed to responsible sourcing and planting a tree for every piece of furniture sold.
              </p>
            </div>
          </div>
        </div>
      </div>
      <TestimonialSection />
      <div className="bg-wood-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-semibold text-white mb-4">Join Our Newsletter</h2>
          <p className="text-wood-200 max-w-2xl mx-auto mb-8">
            Subscribe to receive updates on new products, special offers, and exclusive discounts.
          </p>
          <div className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow rounded-l-lg px-4 py-3 focus:outline-none"
            />
            <button className="bg-wood-600 hover:bg-wood-700 text-white px-6 py-3 rounded-r-lg font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
