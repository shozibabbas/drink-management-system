import { Injectable } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(email: string, password: string = null) {
    return this.userRepository
      .findOne({
        where: {
          email,
          password,
        },
      })
      .then((user: any) => user.dataValues);
  }

  async validate(email: string) {
    return this.userRepository
      .findOne({
        where: {
          email,
        },
      })
      .then((user: any) => user.dataValues);
  }
}
