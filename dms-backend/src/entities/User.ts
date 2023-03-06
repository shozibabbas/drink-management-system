import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Role } from './Role';
import { UserHasDrink } from './UserHasDrink';
import { Drink } from './Drink';

export interface UserAttributes {
  id?: number;
  roleId: number;
  email: string;
  password: string;
  createTime?: Date;
  updateTime?: Date;
  isDeleted?: number;
}

@Table({ tableName: 'user', timestamps: false })
export class User
  extends Model<UserAttributes, UserAttributes>
  implements UserAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @ForeignKey(() => Role)
  @Column({ field: 'role_id', type: DataType.INTEGER })
  @Index({
    name: 'fk_user_role1_idx',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  roleId!: number;

  @Column({ type: DataType.STRING(200) })
  email!: string;

  @Column({ type: DataType.STRING(200) })
  password!: string;

  @Column({
    field: 'create_time',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createTime?: Date;

  @Column({ field: 'update_time', allowNull: true, type: DataType.DATE })
  updateTime?: Date;

  @Column({ field: 'is_deleted', type: DataType.TINYINT, defaultValue: '0' })
  isDeleted?: number;

  @BelongsTo(() => Role)
  Role?: Role;

  @HasMany(() => UserHasDrink, { sourceKey: 'id' })
  UserHasDrinks?: UserHasDrink[];

  @BelongsToMany(() => Drink, () => UserHasDrink)
  Drinks?: Drink[];
}
