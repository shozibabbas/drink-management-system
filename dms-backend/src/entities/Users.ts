import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: false,
})
export class Users extends Model {
  @PrimaryKey
  @Column
  ID: number;

  @Column
  user_login: string;

  @Column
  user_pass: string;

  @Column
  user_nicename: string;

  @Column
  user_email: string;

  @Column
  display_name: string;
}
