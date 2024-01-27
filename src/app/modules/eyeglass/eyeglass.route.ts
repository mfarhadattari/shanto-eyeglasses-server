import express from 'express';
import authValidator from '../../middlewares/authValidator';
import formDataParser from '../../middlewares/formDataParser';
import requestBodyValidator from '../../middlewares/requestBodyValidator';
import { upload } from '../../utils/fileUpload';
import { EyeglassControllers } from './eyeglass.controller';
import { createEyeglassValidationSchema } from './eyeglass.validation';

// initialize router
const router = express.Router();

// add eyeglass route
router.post(
  '/',
  authValidator,
  upload.single('file'),
  formDataParser,
  requestBodyValidator(createEyeglassValidationSchema),
  EyeglassControllers.addEyeglass,
);

// get eyeglasses route
router.get('/', EyeglassControllers.getEyeglasses);

// get eyeglass route
router.get('/:id', EyeglassControllers.getEyeglass);

// exporting eyeglass routes
export const EyeglassRoutes = router;
