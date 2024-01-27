import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SaleServices } from './sale.service';

// add sale controller
const addSale = catchAsync(async (req, res) => {
  const data = req.body;
  const user = req.user;
  const result = await SaleServices.addSale(user, data);

  sendResponse(res, {
    status: httpStatus.CREATED,
    message: 'Sold successfully',
    data: result,
  });
});

// get all sales controller
const getAllSales = catchAsync(async (req, res) => {
  const filter =
    (req.query.filter as 'daily' | 'weekly' | 'monthly' | 'yearly') || null;
  const result = await SaleServices.getAllSales(filter);

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Sales retrieve successfully',
    data: result,
  });
});

// get single sale controller
const getSale = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await SaleServices.getSale(id);

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Sale retrieve successfully',
    data: result,
  });
});

// exporting Sale controllers
export const SaleControllers = {
  addSale,
  getAllSales,
  getSale,
};
