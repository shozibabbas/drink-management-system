import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { User } from './User';

export interface RoleAttributes {
  id?: number;
  name: string;
  description?: string;
}

@Table({ tableName: 'role', timestamps: false })
export class Role
  extends Model<RoleAttributes, RoleAttributes>
  implements RoleAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.STRING(100) })
  name!: string;

  @Column({ allowNull: true, type: DataType.STRING(500) })
  description?: string;

  @HasMany(() => User, { sourceKey: 'id' })
  Users?: User[];
}
