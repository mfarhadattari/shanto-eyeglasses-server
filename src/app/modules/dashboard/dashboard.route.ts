import express from 'express';
import authValidator from '../../middlewares/authValidator';
import { DashboardControllers } from './dashboard.controller';

// initialize router
const router = express.Router();

// dashboard home route
router.get('/', authValidator, DashboardControllers.getDashboard);

// exporting dashboard routes
export const DashboardRoutes = router;
