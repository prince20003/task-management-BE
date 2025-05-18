// src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { errorResponse, successResponse } from '../utils/response';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password_hash: hash });
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );
    successResponse(res, { id: user.id, name: user.name, email: user.email, token }, 'Registered successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      errorResponse(res, 'Invalid credentials', 401);
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
      errorResponse(res, 'Invalid credentials', 401);
      return;
    }
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );
    successResponse(res, { id: user.id, email: user.email, token }, 'Login successful');
  } catch (error) {
    next(error);
  }
};