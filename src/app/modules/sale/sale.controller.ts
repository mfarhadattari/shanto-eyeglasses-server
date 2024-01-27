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

// exporting Sale controllers
export const SaleControllers = {
  addSale,
};
