import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <div className="relative h-[80vh] min-h-[600px] bg-wood-900">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80"
          alt="Premium wooden furniture showcase"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">
              Timeless Wooden Craftsmanship
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover our collection of premium wooden furniture, handcrafted with precision and passion.
            </p>
            <div className="flex gap-4">
              <Link
                to="/shop"
                className="inline-block bg-wood-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-wood-700 transition-colors"
              >
                Shop Collection
              </Link>
              <Link
                to="/about"
                className="inline-block bg-white/10 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}; 