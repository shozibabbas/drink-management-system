import { Module } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { DrinksController } from './drinks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Drink, UserHasDrink } from '../entities';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    SequelizeModule.forFeature([Drink, UserHasDrink]),
  ],
  controllers: [DrinksController],
  providers: [DrinksService],
})
export class DrinksModule {}
