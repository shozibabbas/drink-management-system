import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ConsumeDrinkDto } from '../common/dto/consume-drink.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../entities';

@UseGuards(JwtAuthGuard)
@Controller('drinks')
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) {}

  @Get()
  getDrinks() {
    return this.drinksService.getDrinks();
  }

  @Post('consume')
  async consumeDrink(
    @CurrentUser() currentUser: User,
    @Body() consumeDrinkDto: ConsumeDrinkDto,
  ) {
    return this.drinksService.consumeDrink(consumeDrinkDto, currentUser.id);
  }

  @Get('user')
  getDrinksOfUser(@CurrentUser() currentUser: User) {
    return this.drinksService.getUserDrinks(currentUser.id);
  }
}
