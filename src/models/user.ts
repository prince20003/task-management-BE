import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

interface UserAttrs { id: string; name: string; email: string; password_hash: string; }
interface UserCreation extends Optional<UserAttrs,'id'> {}

export class User extends Model<UserAttrs,UserCreation> implements UserAttrs {
  public id!: string;
  public name!: string;
  public email!: string;
  public password_hash!: string;
}
User.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password_hash: { type: DataTypes.STRING, allowNull: false }
}, { sequelize, tableName: 'users' });
