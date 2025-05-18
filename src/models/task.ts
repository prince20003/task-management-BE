import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';
import { User } from './user';
import { Category } from './category';

interface TaskAttrs {
  id: string;
  title: string;
  description?: string;
  priority?: string;
  completed: boolean;
  due_date?: Date;
  user_id: string;
  category_id: string;
}
interface TaskCreation extends Optional<TaskAttrs,'id'> {}

export class Task extends Model<TaskAttrs,TaskCreation> implements TaskAttrs {
  public id!: string;
  public title!: string;
  public description?: string;
  public priority?: string;
  public completed!: boolean;
  public due_date?: Date;
  public user_id!: string;
  public category_id!: string;
}
Task.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  priority: { type: DataTypes.STRING, allowNull: false },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  due_date: DataTypes.DATE,
  user_id: { type: DataTypes.UUID, allowNull: false },
  category_id: { type: DataTypes.UUID, allowNull: false }
}, { sequelize, tableName: 'tasks', underscored: true,
    timestamps: true
 });

// Associations
User.hasMany(Task, { foreignKey: 'user_id' });
Task.belongsTo(User, { foreignKey: 'user_id' });
Category.hasMany(Task, { foreignKey: 'category_id' });
Task.belongsTo(Category, { foreignKey: 'category_id' });
