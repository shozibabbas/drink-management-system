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
      });
  }

  async getOrCreate(email: string, name: string, password: string) {
    const [user, created] = await this.userRepository.findOrCreate({
      where: {
        email,
      },
      defaults: {
        name,
        email,
        password,
        isActive: password ? 1 : 0,
      },
      include: [Role],
    });
    let accountCreated = created;
    if (!created && !user.isActive && password) {
      user.password = password;
      user.isActive = 1;
      await user.save();
      accountCreated = true;
    }
    return { user, accountCreated };
  }

  async validate(email: string) {
    return this.userRepository
      .findOne({
        where: {
          email,
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
}
