import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';

// initialize route
const router = express.Router();

const applicationRoutes = [
  {
    path: '/auth',
    router: AuthRoutes,
  },
];

applicationRoutes.map((route) => router.use(route.path, route.router));

// exporting auth route
export const Routes = router;
