import mongoose, { Schema, Document, Types } from 'mongoose';
import { IProduct } from './Product';

export interface IWishlist extends Document {
  userId: Types.ObjectId;
  products: IProduct[];
  createdAt: string;
  updatedAt: string;
}

const WishlistSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  createdAt: {
    type: String,
    required: true
  },
  updatedAt: {
    type: String,
    required: true
  }
});

export default mongoose.model<IWishlist>('Wishlist', WishlistSchema); 