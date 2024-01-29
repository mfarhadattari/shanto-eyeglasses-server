import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DashboardServices } from './dashboard.service';

// dashboard home controller
const getDashboard = catchAsync(async (req, res) => {
  const result = await DashboardServices.getDashboard();

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Data retrieved successfully',
    data: result,
  });
});

// exporting Dashboard controllers
export const DashboardControllers = {
  getDashboard,
};
