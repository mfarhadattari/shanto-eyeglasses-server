import { Schema, model } from 'mongoose';
import {
  FRAMEMATERIALS,
  FRAMESHAPES,
  GENDERS,
  LENSTYPES,
} from './eyeglass.const';
import { IEyeglass } from './eyeglass.interface';

const eyeglassSchema = new Schema<IEyeglass>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    frameMaterial: {
      type: String,
      enum: FRAMEMATERIALS,
      required: true,
    },
    frameShape: {
      type: String,
      enum: FRAMESHAPES,
      required: true,
    },
    lensType: {
      type: String,
      enum: LENSTYPES,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: GENDERS,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    otherRelevantAttributes: {
      type: Object,
      default: {},
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    seller: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export const Eyeglass = model<IEyeglass>('Eyeglass', eyeglassSchema);
