
import { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '@/data/mockData';
import { Product } from '@/types';

const FeaturedProducts = () => {
  const featuredProducts = products.filter(product => product.featured);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-semibold text-wood-800 mb-4">Featured Collection</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked selection of premium wooden products, crafted with attention to detail and designed to last generations.
          </p>
        </div>
        
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
