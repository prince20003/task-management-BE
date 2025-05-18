import { Router } from 'express';
import { createTaskValidator, updateTaskValidator } from '../validators/task';
import { validate } from '../middleware/validate';
import { createTask, deleteTask, listTasks, updateTask } from '../controllers/taskController';

const taskRouter = Router();

// GET    /api/tasks         -> list tasks
taskRouter.get('/', listTasks);

// POST   /api/tasks         -> create task
taskRouter.post('/', createTaskValidator, validate, createTask);

// PUT    /api/tasks/:id     -> update task
taskRouter.put('/:id', updateTaskValidator, validate, updateTask);

// DELETE /api/tasks/:id     -> delete task
taskRouter.delete('/:id', deleteTask);

export default taskRouter;