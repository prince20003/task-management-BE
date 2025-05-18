import { Router } from 'express';
import { listCategories } from '../controllers/categoriesController';

const categoryRouter = Router();

categoryRouter.get('/', listCategories);

export default categoryRouter;