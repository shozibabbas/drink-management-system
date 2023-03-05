import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../entities';
import { Repository } from 'sequelize-typescript';

@Controller('users')
export class UsersController {
  constructor(
    @InjectModel(User)
    private userRepository: Repository<User>,
  ) {}

  @Get()
  getUsers() {
    return this.userRepository.findAll();
  }
}
