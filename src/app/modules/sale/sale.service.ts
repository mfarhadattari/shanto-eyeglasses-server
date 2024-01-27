import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import AppError from '../../error/AppError';
import { Eyeglass } from '../eyeglass/eyeglass.model';
import { ISale } from './sale.interface';
import { Sale } from './sale.model';
import { currentMonthStartDate, currentWeekStartDate } from './sale.utils';

// add sale service
const addSale = async (user: JwtPayload, payload: ISale) => {
  // check product is deleted
  const product = await Eyeglass.findById(payload.product);
  if (!product || product.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found or stock out');
  }

  // check product stock quantity >= sale quantity
  if (product.quantity < payload.quantity) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${product.quantity} product in stock, but selling ${payload.quantity}`,
    );
  }

  // add seller info
  payload.seller = user._id;

  // run operation into db
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // store sale data
    const saleOperation = await Sale.create([payload], { session });
    if (!saleOperation || !saleOperation.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to sale');
    }

    // update product stock
    const updateStockOperation = await Eyeglass.findByIdAndUpdate(
      payload.product,
      {
        $inc: {
          quantity: -payload.quantity,
        },
        isDeleted: product.quantity === payload.quantity,
      },
      {
        new: true,
        runValidators: true,
        session,
      },
    );
    if (!updateStockOperation) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update stock.');
    }

    await session.commitTransaction();
    await session.endSession();

    // get sale data
    const result = await Sale.findById(saleOperation[0]._id).populate(
      'product seller',
    );
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(error.status, error.message);
  }
};

// get all sales
const getAllSales = async (
  filter: 'daily' | 'weekly' | 'monthly' | 'yearly' | null,
) => {
  let filterQuery: Record<string, unknown> = {};

  if (filter === 'daily') {
    filterQuery = {
      saleAt: {
        $gte: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
        ),
      },
    };
  }

  if (filter === 'weekly') {
    filterQuery = {
      saleAt: {
        $gt: currentWeekStartDate(),
      },
    };
  }

  if (filter === 'monthly') {
    filterQuery = {
      saleAt: {
        $gt: currentMonthStartDate(),
      },
    };
  }

  if (filter === 'yearly') {
    filterQuery = {
      saleAt: {
        $gt: new Date(new Date().getFullYear(), 0, 1),
      },
    };
  }

  const result = await Sale.find(filterQuery)
    .sort('-saleAt')
    .populate('product seller');
  return result;
};

// get single sales
const getSale = async (id: string) => {
  const result = await Sale.findById(id).populate('product seller');
  return result;
};

// exporting sale services
export const SaleServices = {
  addSale,
  getAllSales,
  getSale,
};
