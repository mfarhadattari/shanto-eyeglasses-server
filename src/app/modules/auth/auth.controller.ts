import httpStatus from 'http-status';
import config from '../../config';
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
  const { user, accessToken, refreshToken } =
    await AuthServices.loginUser(data);

  res.cookie(`refresh-${config.COOKIES_NAME}`, refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV !== 'development',
  });
  res.cookie(`access-${config.COOKIES_NAME}`, accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV !== 'development',
  });

  sendResponse(res, {
    status: httpStatus.CREATED,
    message: 'User login successfully',
    data: user,
  });
});

// refresh token controller
const refreshToken = catchAsync(async (req, res) => {
  const token = req.cookies[`refresh-${config.COOKIES_NAME}`];
  const { user, accessToken } = await AuthServices.refreshToken(token);

  res.cookie(`access-${config.COOKIES_NAME}`, accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV !== 'development',
  });

  sendResponse(res, {
    status: httpStatus.CREATED,
    message: 'Token refresh successfully',
    data: user,
  });
});

// exporting auth controllers
export const AuthControllers = {
  registerUser,
  loginUser,
  refreshToken,
};
