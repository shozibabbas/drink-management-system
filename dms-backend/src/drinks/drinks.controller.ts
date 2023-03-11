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
import RoleGuard from '../common/guards/role.guard';

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

  @UseGuards(RoleGuard(2))
  @UseGuards(JwtAuthGuard)
  @Post('bulk_consume')
  async bulkConsumeDrink(@Body('inputs') inputs: GuestConsumeDrinkDto[]) {
    return this.drinksService.bulkConsumeDrinks(inputs);
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

  @UseGuards(RoleGuard(2))
  @UseGuards(JwtAuthGuard)
  @Get('all_users')
  getDrinksOfAllUser(
    @Query('year') year,
    @Query('month') month,
    @Query('userId') userId,
    @Query('rowsPerPage') rowsPerPage,
    @Query('page') page,
  ) {
    rowsPerPage = parseInt(rowsPerPage);
    page = parseInt(page);
    return this.drinksService.getAllUserDrinks({
      year,
      month,
      userId,
      rowsPerPage,
      page,
    });
  }

  @UseGuards(RoleGuard(2))
  @UseGuards(JwtAuthGuard)
  @Delete('user')
  deleteDrinkOfUser(@Query('id') id) {
    return this.drinksService.deleteUserDrink(id);
  }

  @UseGuards(RoleGuard(2))
  @UseGuards(JwtAuthGuard)
  @Post('user')
  retrieveDrinkOfUser(@Body('id') id) {
    return this.drinksService.retrieveDrinkOfUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/drinking_users')
  getDrinkingUsers(@Query('year') year, @Query('month') month) {
    return this.drinksService.getAllUsers();
  }

  @UseGuards(RoleGuard(2))
  @UseGuards(JwtAuthGuard)
  @Get('/generate-bills')
  async generateBills(
    @Query('year') year,
    @Query('month') month,
    @Query('userId') userId,
  ) {
    return this.drinksService.generateBills({ year, month, userId });
  }
}
