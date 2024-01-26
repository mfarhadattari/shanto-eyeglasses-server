import express from 'express';
import authValidator from '../../middlewares/authValidator';
import formDataParser from '../../middlewares/formDataParser';
import requestBodyValidator from '../../middlewares/requestBodyValidator';
import { upload } from '../../utils/fileUpload';
import { AuthControllers } from './auth.controller';
import {
  loginUserValidationSchema,
  refreshTokenValidationSchema,
  registerUserValidationSchema,
} from './auth.validation';

// initialize route
const router = express.Router();

// register user route
router.post(
  '/register',
  upload.single('file'),
  formDataParser,
  requestBodyValidator(registerUserValidationSchema),
  AuthControllers.registerUser,
);

// login user route
router.post(
  '/login',
  requestBodyValidator(loginUserValidationSchema),
  AuthControllers.loginUser,
);

// refresh token route
router.get(
  '/refresh-token',
  requestBodyValidator(refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

// my profile route
router.get('/my-profile', authValidator, AuthControllers.refreshToken);

// exporting auth route
export const AuthRoutes = router;
