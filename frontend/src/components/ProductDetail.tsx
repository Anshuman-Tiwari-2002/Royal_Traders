import React from 'react';
import { Product } from '@/types/product';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="grid grid-cols-3 gap-2">
            {product.images.slice(1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} view ${index + 2}`}
                className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75"
              />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-2xl font-semibold text-gray-800 mt-2">₹{product.price.toLocaleString('en-IN')}</p>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">Specifications</h2>
            <ul className="mt-2 space-y-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <li key={key} className="flex justify-between">
                  <span className="text-gray-600">{key}:</span>
                  <span className="text-gray-900">{value as string}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
            <button className="mt-4 bg-wood-600 text-white px-6 py-2 rounded-md hover:bg-wood-700">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 