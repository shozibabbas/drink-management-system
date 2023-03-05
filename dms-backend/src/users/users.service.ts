import { Injectable } from '@nestjs/common';
import { Users } from '../entities/Users';
import { Repository } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private userRepository: Repository<Users>,
  ) {}

  async findOne(username: string, password: string = null) {
    return this.userRepository
      .findOne({
        where: {
          user_login: username,
          user_pass: password,
        },
      })
      .then((user: any) => user.dataValues);
  }

  async validate(username: string) {
    return this.userRepository
      .findOne({
        where: {
          user_login: username,
        },
      })
      .then((user: any) => user.dataValues);
  }
}
