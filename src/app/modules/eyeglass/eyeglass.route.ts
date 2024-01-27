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

// exporting eyeglass routes
export const EyeglassRoutes = router;
