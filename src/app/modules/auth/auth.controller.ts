import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

// register user controller
const registerUser = catchAsync(async (req, res) => {
  const data = req.body;
  const file = req.file;
  const result = await AuthServices.registerUser(file, data);

  sendResponse(res, {
    status: httpStatus.CREATED,
    message: 'User register successfully',
    data: result,
  });
});

// login user controller
const loginUser = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await AuthServices.loginUser(data);

  sendResponse(res, {
    status: httpStatus.CREATED,
    message: 'User login successfully',
    data: result,
  });
});

// exporting auth controllers
export const AuthControllers = {
  registerUser,
  loginUser,
};
