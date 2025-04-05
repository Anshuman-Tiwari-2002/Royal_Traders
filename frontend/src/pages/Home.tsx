import { useState } from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { Testimonials } from '@/components/home/Testimonials';
import { NewsletterSignup } from '@/components/home/NewsletterSignup';

const HomePage = () => {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-semibold text-gray-900 mb-8">
            Featured Collections
          </h2>
          <FeaturedProducts />
        </div>
      </section>

      {/* Category Showcase */}
      <section className="py-16 bg-wood-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-semibold text-gray-900 mb-8">
            Shop by Category
          </h2>
          <CategoryShowcase />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-semibold text-gray-900 mb-8">
            What Our Customers Say
          </h2>
          <Testimonials />
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-wood-100">
        <div className="container mx-auto px-4">
          <NewsletterSignup 
            isOpen={isNewsletterOpen}
            onClose={() => setIsNewsletterOpen(false)}
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage; 