import { Injectable } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Role, User, UserHasDrink } from '../entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: Repository<User>,
    @InjectModel(UserHasDrink)
    private userHasDrinkRepository: Repository<UserHasDrink>,
  ) {}

  async findOne(email: string, password: string = null) {
    return this.userRepository
      .findOne({
        where: {
          email,
          password,
        },
        include: [Role],
      })
      .then((user: any) => {
        if (user) {
          return user.dataValues;
        }
        return null;
      });
  }

  async validate(email: string) {
    return this.userRepository
      .findOne({
        where: {
          email,
        },
        include: [Role],
      })
      .then((user: any) => user.dataValues);
  }
}
