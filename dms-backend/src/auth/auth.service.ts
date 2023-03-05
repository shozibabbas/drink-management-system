import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username, pass);
    if (user) {
      const { user_pass, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: any) {
    const payload = { username: user.user_login, sub: user.ID };
    const { ID, user_pass, ...result } = user;
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
      }),
      expires_in: this.configService.get<string>('JWT_EXPIRES_IN'),
      ...result,
    };
  }
}
