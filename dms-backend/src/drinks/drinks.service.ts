import { Injectable } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import { Drink, User, UserHasDrink } from '../entities';
import { InjectModel } from '@nestjs/sequelize';
import { ConsumeDrinkDto } from '../common/dto/consume-drink.dto';

@Injectable()
export class DrinksService {
  constructor(
    @InjectModel(Drink) private drinkService: Repository<Drink>,
    @InjectModel(UserHasDrink)
    private userHasDrinkRepository: Repository<UserHasDrink>,
  ) {}

  getDrinks() {
    return this.drinkService.findAll();
  }

  async consumeDrink(consumeDrinkDto: ConsumeDrinkDto, userId: number) {
    for (let i = 0; i < consumeDrinkDto.quantity; i++) {
      const userDrink = new UserHasDrink();
      userDrink.userId = userId;
      userDrink.drinkId = consumeDrinkDto.drinkId;
      await userDrink.save();
    }
  }

  async getUserDrinks(userId: number) {
    return this.userHasDrinkRepository
      .findAll({
        where: {
          userId,
        },
        include: [User, Drink],
        order: [['id', 'DESC']],
      })
      .then((uArr) =>
        uArr.map((u, i) => ({
          i: i + 1,
          name: u.Drink.name,
          createTime: u.createTime,
        })),
      );
  }
}
