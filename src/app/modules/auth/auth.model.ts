import { Schema, model } from 'mongoose';
import { ROLE } from './auth.const';
import { IUser } from './auth.interface';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    avatar: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ROLE,
      default: 'user',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  },
);

export const User = model<IUser>('User', userSchema);
