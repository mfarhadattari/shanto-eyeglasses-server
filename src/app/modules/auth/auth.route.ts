import express from 'express';
import { AuthControllers } from './auth.controller';

// initialize route
const router = express.Router();

// register user route
router.post('/register', AuthControllers.registerUser);

// exporting auth route
export const AuthRoutes = router;
