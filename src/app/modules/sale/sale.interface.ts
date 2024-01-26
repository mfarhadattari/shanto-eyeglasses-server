import { Types } from 'mongoose';

export interface ISale {
  product: Types.ObjectId;
  quantity: number;
  buyerName: string;
  seller: Types.ObjectId;
  saleAt: Date;
}
