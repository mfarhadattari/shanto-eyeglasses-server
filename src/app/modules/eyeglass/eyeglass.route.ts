import express from 'express';
import authValidator from '../../middlewares/authValidator';
import formDataParser from '../../middlewares/formDataParser';
import requestBodyValidator from '../../middlewares/requestBodyValidator';
import { upload } from '../../utils/fileUpload';
import { EyeglassControllers } from './eyeglass.controller';
import {
  bulkDeleteEyeglassesValidationSchema,
  createEyeglassValidationSchema,
  updateEyeglassValidationSchema,
} from './eyeglass.validation';

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
router.get('/', authValidator, EyeglassControllers.getEyeglasses);

// bulk delete eyeglasses route
router.delete(
  '/bulk-delete',
  authValidator,
  requestBodyValidator(bulkDeleteEyeglassesValidationSchema),
  EyeglassControllers.bulkDeleteEyeglasses,
);

// get eyeglass route
router.get('/:id', authValidator, EyeglassControllers.getEyeglass);

// update eyeglass route
router.put(
  '/:id',
  authValidator,
  requestBodyValidator(updateEyeglassValidationSchema),
  EyeglassControllers.updateEyeglass,
);

// delete eyeglass route
router.delete('/:id', authValidator, EyeglassControllers.deleteEyeglass);

// exporting eyeglass routes
export const EyeglassRoutes = router;
