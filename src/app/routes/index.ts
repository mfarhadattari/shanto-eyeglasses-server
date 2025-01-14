import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { DashboardRoutes } from '../modules/dashboard/dashboard.route';
import { EyeglassRoutes } from '../modules/eyeglass/eyeglass.route';
import { SaleRoutes } from '../modules/sale/sale.route';

// initialize route
const router = express.Router();

const applicationRoutes = [
  {
    path: '/auth',
    router: AuthRoutes,
  },
  {
    path: '/eyeglasses',
    router: EyeglassRoutes,
  },
  {
    path: '/sales',
    router: SaleRoutes,
  },
  {
    path: '/dashboard',
    router: DashboardRoutes,
  },
];

applicationRoutes.map((route) => router.use(route.path, route.router));

// exporting auth route
export const Routes = router;
