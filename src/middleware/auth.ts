import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { errorResponse } from '../utils/response';

interface JwtPayload {
  userId: string;
}

export const authMiddleware = async (
  req: Request & { user?: User },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    errorResponse(res, 'Missing auth token', 401);
    return;
  }
  const token = authHeader.slice(7).trim();
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    const user = await User.findByPk(payload.userId);
    if (!user) {
      errorResponse(res, 'Invalid token: user not found', 401);
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    errorResponse(res, 'Invalid or expired token', 401);
  }
};
