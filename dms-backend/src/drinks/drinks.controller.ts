import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ConsumeDrinkDto } from '../common/dto/consume-drink.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../entities';
import { GuestConsumeDrinkDto } from '../common/dto/guest-consume-drink.dto';

@Controller('drinks')
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) {}

  @Get()
  getDrinks() {
    return this.drinksService.getDrinks();
  }

  @UseGuards(JwtAuthGuard)
  @Post('consume')
  async consumeDrink(
    @CurrentUser() currentUser: User,
    @Body() consumeDrinkDto: ConsumeDrinkDto,
  ) {
    return this.drinksService.consumeDrink(consumeDrinkDto, currentUser.id);
  }

  @Post('guest/consume')
  async guestConsumeDrink(@Body() guestConsumeDrinkDto: GuestConsumeDrinkDto) {
    guestConsumeDrinkDto.password = guestConsumeDrinkDto.password?.trim();
    return this.drinksService.guestConsumeDrink(guestConsumeDrinkDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getDrinksOfUser(
    @CurrentUser() currentUser: User,
    @Query('year') year,
    @Query('month') month,
  ) {
    return this.drinksService.getUserDrinks(currentUser.id, { year, month });
  }

  @UseGuards(JwtAuthGuard)
  @Get('all_users')
  getDrinksOfAllUser(
    @Query('year') year,
    @Query('month') month,
    @Query('userId') userId,
  ) {
    return this.drinksService.getAllUserDrinks({ year, month, userId });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('user')
  deleteDrinkOfUser(@Query('id') id) {
    return this.drinksService.deleteUserDrink(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('user')
  retrieveDrinkOfUser(@Body('id') id) {
    return this.drinksService.retrieveDrinkOfUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/drinking_users')
  getDrinkingUsers(@Query('year') year, @Query('month') month) {
    return this.drinksService.getDrinkingUsers({ year, month });
  }
}
