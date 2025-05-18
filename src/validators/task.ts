import { body, param } from 'express-validator';

export const createTaskValidator = [
  body('title').isString().notEmpty(),
  body('category_id').isUUID(),
  body('due_date').optional().isISO8601(),
];

export const updateTaskValidator = [
  param('id').isUUID(),
  body('title').optional().isString(),
  body('completed').optional().isBoolean(),
  body('category_id').optional().isUUID(),
  body('due_date').optional().isISO8601()
];
