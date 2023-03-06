import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { UserHasDrink } from './UserHasDrink';
import { User } from './User';

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

  @HasMany(() => UserHasDrink, { sourceKey: 'id' })
  UserHasDrinks?: UserHasDrink[];

  @BelongsToMany(() => User, () => UserHasDrink)
  Users?: User[];
}
