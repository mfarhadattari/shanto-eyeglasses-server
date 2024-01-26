import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

// register user controller
const registerUser = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await AuthServices.registerUser(body);

  sendResponse(res, {
    status: httpStatus.CREATED,
    message: 'User register successfully',
    data: result,
  });
});

// exporting auth controllers
export const AuthControllers = {
  registerUser,
};
