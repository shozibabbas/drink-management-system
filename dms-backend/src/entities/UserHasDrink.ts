import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './User';
import { Drink } from './Drink';

export interface UserHasDrinkAttributes {
  id?: number;
  userId: number;
  drinkId: number;
  createTime?: Date;
  updateTime?: Date;
  isDeleted?: number;
}

@Table({ tableName: 'user_has_drink', timestamps: false })
export class UserHasDrink
  extends Model<UserHasDrinkAttributes, UserHasDrinkAttributes>
  implements UserHasDrinkAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @ForeignKey(() => User)
  @Column({ field: 'user_id', type: DataType.INTEGER })
  @Index({
    name: 'fk_user_has_drink_user_idx',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  userId!: number;

  @ForeignKey(() => Drink)
  @Column({ field: 'drink_id', type: DataType.INTEGER })
  @Index({
    name: 'fk_user_has_drink_drink1_idx',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  drinkId!: number;

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

  @BelongsTo(() => User)
  User?: User;

  @BelongsTo(() => Drink)
  Drink?: Drink;
}
