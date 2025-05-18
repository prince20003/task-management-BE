// src/controllers/categoriesController.ts
import { RequestHandler } from 'express';
import { Category } from '../models/category';
import { successResponse } from '../utils/response';

export const listCategories: RequestHandler = async (req, res, next) => {
  try {
    const cats = await Category.findAll();
    // res.json(cats);
    successResponse(res, cats, 'Category fetched successfully', 200);
  } catch (error) {
    next(error);
  }
};