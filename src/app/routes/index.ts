import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { EyeglassRoutes } from '../modules/eyeglass/eyeglass.route';

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
];

applicationRoutes.map((route) => router.use(route.path, route.router));

// exporting auth route
export const Routes = router;
