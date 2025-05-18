import { body } from 'express-validator';

export const registerValidator = [
  body('name').isString(),
  body('email').isString().isEmail(),
  body('password').isString().isLength({ min: 6 })
];

export const loginValidator = [
  body('email').isString().isEmail(),
  body('password').isString()
];
