import {
  BelongsToMany,
  Column,
  DataType,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './User';
import { UserHasDrink } from './UserHasDrink';

export interface DrinkAttributes {
  id?: number;
  name: string;
}

@Table({ tableName: 'drink', timestamps: false })
export class Drink
  extends Model<DrinkAttributes, DrinkAttributes>
  implements DrinkAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.STRING(100) })
  name!: string;

  @BelongsToMany(() => User, () => UserHasDrink)
  Users?: User[];
}
