// src/routes/authRoutes.ts
import { Router } from 'express';
import { registerValidator, loginValidator } from '../validators/auth';
import { login, register } from '../controllers/authController';
import { validate } from '../middleware/validate';

const authRouter = Router();

// Register
authRouter.post(
  '/register',
  registerValidator,
  validate,
  register
);

// Login
authRouter.post(
  '/login',
  loginValidator,
  validate,
  login
);

export default authRouter;