import express from 'express';
import requestBodyValidator from '../../middlewares/requestBodyValidator';
import { AuthControllers } from './auth.controller';
import { registerUserValidationSchema } from './auth.validation';

// initialize route
const router = express.Router();

// register user route
router.post(
  '/register',
  requestBodyValidator(registerUserValidationSchema),
  AuthControllers.registerUser,
);

// exporting auth route
export const AuthRoutes = router;
