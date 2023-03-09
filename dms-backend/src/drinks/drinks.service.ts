import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import { Drink, User, UserHasDrink } from '../entities';
import { InjectModel } from '@nestjs/sequelize';
import { ConsumeDrinkDto } from '../common/dto/consume-drink.dto';
import { col, fn, Op, where } from 'sequelize';
import { GuestConsumeDrinkDto } from '../common/dto/guest-consume-drink.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DrinksService {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    @InjectModel(Drink) private drinkRepository: Repository<Drink>,
    @InjectModel(UserHasDrink)
    private userHasDrinkRepository: Repository<UserHasDrink>,
  ) {}

  getDrinks() {
    return this.drinkRepository.findAll();
  }

  async consumeDrink(consumeDrinkDto: ConsumeDrinkDto, userId: number) {
    for (let i = 0; i < consumeDrinkDto.quantity; i++) {
      const userDrink = new UserHasDrink();
      userDrink.userId = userId;
      userDrink.drinkId = consumeDrinkDto.drinkId;
      await userDrink.save();
    }
  }

  async guestConsumeDrink(guestConsumeDrinkDto: GuestConsumeDrinkDto) {
    const { user, accountCreated } = await this.usersService.getOrCreate(
      guestConsumeDrinkDto.email,
      guestConsumeDrinkDto.name,
      guestConsumeDrinkDto.password,
    );
    await this.consumeDrink(guestConsumeDrinkDto, user.id);
    if (accountCreated && user.password && user.isActive) {
      return this.authService.login(user.dataValues);
    }
  }

  async getUserDrinks(userId: number, { year, month }) {
    return this.userHasDrinkRepository
      .findAll({
        where: {
          userId,
          [Op.and]: [
            where(fn('YEAR', col('UserHasDrink.create_time')), year),
            where(fn('MONTH', col('UserHasDrink.create_time')), month),
          ],
        },
        include: [User, Drink],
        order: [['id', 'DESC']],
      })
      .then((uArr) =>
        uArr.map((u, i) => ({
          i: i + 1,
          drinkId: u.Drink.id,
          name: u.Drink.name,
          createTime: u.createTime,
        })),
      );
  }

  async getAllUserDrinks({ year, month, userId }) {
    const whereCondition = {
      [Op.and]: [
        where(fn('YEAR', col('UserHasDrink.create_time')), year),
        where(fn('MONTH', col('UserHasDrink.create_time')), month),
      ],
    };
    if (userId && userId > 0) {
      // @ts-ignore
      whereCondition[Op.and].push({ userId });
    }
    return this.userHasDrinkRepository
      .findAndCountAll({
        where: whereCondition,
        include: [User, Drink],
        order: [['id', 'DESC']],
      })
      .then((uArr) => {
        const rows = uArr.rows.map((u, i) => ({
          i: i + 1,
          id: u.id,
          userId: u.User.id,
          userName: u.User.name,
          userEmail: u.User.email,
          drinkId: u.Drink.id,
          drinkName: u.Drink.name,
          createTime: u.createTime,
          isDeleted: u.isDeleted,
        }));
        return {
          count: uArr.count,
          rows,
        };
      });
  }

  async deleteUserDrink(id) {
    const userHasDrink = await this.userHasDrinkRepository.findOne({
      where: {
        id,
      },
    });
    if (!userHasDrink) {
      throw new BadRequestException('invalid user or drink');
    }
    userHasDrink.isDeleted = 1;
    userHasDrink.save();
  }

  async retrieveDrinkOfUser(id) {
    const userHasDrink = await this.userHasDrinkRepository.findOne({
      where: {
        id,
      },
    });
    if (!userHasDrink) {
      throw new BadRequestException('invalid user or drink');
    }
    userHasDrink.isDeleted = 0;
    userHasDrink.save();
  }

  getDrinkingUsers({ year, month }) {
    return this.userHasDrinkRepository
      .findAll({
        where: {
          [Op.and]: [
            where(fn('YEAR', col('UserHasDrink.create_time')), year),
            where(fn('MONTH', col('UserHasDrink.create_time')), month),
          ],
        },
        include: [User, Drink],
        order: [['id', 'DESC']],
        group: 'userId',
      })
      .then((uArr) =>
        uArr.map((x) => ({
          id: x.User.id,
          name: x.User.name,
        })),
      );
  }
}
