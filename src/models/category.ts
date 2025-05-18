import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

interface CategoryAttrs { id: string; name: string; }
interface CategoryCreation extends Optional<CategoryAttrs,'id'> {}

export class Category extends Model<CategoryAttrs,CategoryCreation> implements CategoryAttrs {
  public id!: string;
  public name!: string;
}
Category.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
}, { sequelize, tableName: 'categories', underscored: true,
    timestamps: true });
