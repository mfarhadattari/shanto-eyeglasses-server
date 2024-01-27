import express from 'express';
import authValidator from '../../middlewares/authValidator';
import requestBodyValidator from '../../middlewares/requestBodyValidator';
import { SaleControllers } from './sale.controller';
import { saleValidationSchema } from './sale.validation';

// initialize router
const router = express.Router();

// add sale route
router.post(
  '/',
  authValidator,
  requestBodyValidator(saleValidationSchema),
  SaleControllers.addSale,
);

// exporting Sale routes
export const SaleRoutes = router;
