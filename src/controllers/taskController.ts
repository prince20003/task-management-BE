// src/controllers/taskController.ts
import { RequestHandler } from 'express';
import { sequelize } from '../database';
import { Task } from '../models/task';
import { Category } from '../models/category';
import { errorResponse, successResponse } from '../utils/response';

// List tasks for authenticated user
export const listTasks: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const tasks = await Task.findAll({
      where: { user_id: userId },
      include: [{ model: Category, attributes: ['id', 'name'] }],
      order: [['due_date', 'DESC']],
    });
    successResponse(res, tasks, 'Tasks fetched successfully', 200);
  } catch (error) {
    next(error);
  }
};

// Create a new task
export const createTask: RequestHandler = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user!.id;
    const task = await Task.create(
      { ...req.body, user_id: userId },
      { transaction: t }
    );
    await t.commit();
    successResponse(res, task, 'Tasks Created successfully', 200);
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

// Update an existing task
export const updateTask: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const [affectedCount, [updatedTask]] = await Task.update(
      req.body,
      { where: { id: req.params.id, user_id: userId }, returning: true }
    );
    if (affectedCount === 0) {
      errorResponse(res, 'Not found', 404);
      return;
    }
    successResponse(res, updatedTask, 'Tasks updated successfully', 200);
  } catch (error) {
    next(error);
  }
};

// Delete a task
export const deleteTask: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const deletedCount = await Task.destroy({
      where: { id: req.params.id, user_id: userId }
    });
    if (deletedCount === 0) {
      errorResponse(res, 'Not found', 404);
      return;
    }
    successResponse(res, { id: req.params.id }, 'Tasks deleted successfully', 200);
  } catch (error) {
    next(error);
  }
};