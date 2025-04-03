
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
          alt="Wooden Furniture Showcase" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 relative z-10">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-white mb-6 leading-tight">
            Timeless Wooden Craftsmanship
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            Discover our collection of premium quality handcrafted wooden furniture and home decor. Each piece tells a unique story.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button asChild className="bg-wood-600 hover:bg-wood-700 py-6 px-8 text-base">
              <Link to="/shop">Shop Collection</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 py-6 px-8 text-base">
              <Link to="/about" className="flex items-center">
                Learn Our Story <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
