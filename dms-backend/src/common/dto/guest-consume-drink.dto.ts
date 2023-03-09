import { ConsumeDrinkDto } from './consume-drink.dto';

export class GuestConsumeDrinkDto extends ConsumeDrinkDto {
  email: string;
  name: string;
  password: string;
}
