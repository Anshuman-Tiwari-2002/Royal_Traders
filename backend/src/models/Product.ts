import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  stockQuantity: number;
  images: string[];
  specifications: Record<string, string>;
  featured: boolean;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: 0
  },
  images: [{
    type: String,
    required: true
  }],
  specifications: {
    type: Map,
    of: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  createdAt: {
    type: String,
    required: true
  },
  updatedAt: {
    type: String,
    required: true
  }
});

export default mongoose.model<IProduct>('Product', ProductSchema); 