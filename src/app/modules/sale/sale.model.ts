import { Schema, model } from 'mongoose';
import { ISale } from './sale.interface';

const saleSchema = new Schema<ISale>({
  product: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Eyeglass',
  },
  quantity: {
    type: Number,
    required: true,
  },
  buyerName: {
    type: String,
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  saleAt: {
    type: Date,
    default: Date.now,
  },
});

export const Sale = model<ISale>('Sale', saleSchema);
