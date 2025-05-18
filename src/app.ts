import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { sequelize } from './database';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';
import authRouter from './routes/auth';
import taskRouter from './routes/tasks';
import categoryRouter from './routes/categories';
import { authMiddleware } from './middleware/auth';
import './jobs/overdueEmail';
const cors = require('cors');

dotenv.config();

export const app = express();
app.use(requestLogger);
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRouter);
app.use('/api/tasks', authMiddleware, taskRouter);
app.use('/api/categories', authMiddleware, categoryRouter);

// Testing api
app.get('/', (req:any, res:any) => res.send('OK'));

app.use(errorHandler);

// sync models
(async () => {
  await sequelize.authenticate();
  console.log('DB connected');
})();
