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
    status: httpStatus.OK,
    message: 'User login successfully',
    data: result,
  });
});

// refresh token controller
const refreshToken = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await AuthServices.refreshToken(token as string);

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Token refresh successfully',
    data: result,
  });
});

// my profile controller
const myProfile = catchAsync(async (req, res) => {
  const id = req?.user?._id;
  const result = await AuthServices.myProfile(id);

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Token refresh successfully',
    data: result,
  });
});

// exporting auth controllers
export const AuthControllers = {
  registerUser,
  loginUser,
  refreshToken,
  myProfile,
};
