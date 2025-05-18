// src/utils/response.ts
import { Response } from 'express';

/**
 * Send a standardized success response.
 * @param res Express Response object
 * @param data Payload data
 * @param message Optional success message
 * @param status HTTP status code (default: 200)
 */
export function successResponse<T>(
  res: Response,
  data: T,
  message = '',
  status = 200
) {
  return res.status(status).json({
    success: true,
    data,
    message,
  });
}

/**
 * Send a standardized error response.
 * @param res Express Response object
 * @param message Error message
 * @param status HTTP status code (default: 500)
 * @param data Optional error data
 */
export function errorResponse(
  res: Response,
  message = 'Something went wrong',
  status = 500,
  data: any = null
) {
  return res.status(status).json({
    success: false,
    data,
    message,
  });
}
