import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import catchAsync from '../../utils/catchAsync';

// register user controller
const registerUser = catchAsync(async (req, res) => {
  const data = req.body;
  throw new AppError(httpStatus.UNAUTHORIZED, 'Web');
});

// exporting auth controllers
export const AuthControllers = {
  registerUser,
};
