import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env.development' : `.env.${ENV}`,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          dialect: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASS'),
          database: configService.get<string>('DB_NAME'),
          models: [
            // insert model classes here
            // Users
          ],
          synchronize: configService.get<boolean>('DB_SYNC'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
