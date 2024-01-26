import catchAsync from '../../utils/catchAsync';

// register user controller
const registerUser = catchAsync(async (req, res) => {
  const data = req.body;
  throw new Error('Web');
});

// exporting auth controllers
export const AuthControllers = {
  registerUser,
};
