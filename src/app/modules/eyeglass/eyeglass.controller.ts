import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EyeglassServices } from './eyeglass.service';

// add eyeglass controller
const addEyeglass = catchAsync(async (req, res) => {
  const data = req.body;
  const file = req.file;
  const result = await EyeglassServices.addEyeglass(file, data);

  sendResponse(res, {
    status: httpStatus.CREATED,
    message: 'Eyeglass added successfully',
    data: result,
  });
});

// exporting eyeglass controllers
export const EyeglassControllers = { addEyeglass };
