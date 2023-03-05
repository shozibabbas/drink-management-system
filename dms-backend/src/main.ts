import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MyLogger } from './MyLogger';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger(
      WinstonModule.createLogger({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
        transports: [
          new winston.transports.File({
            filename: `logs/${new Date().toISOString().split('T')[0]}.log`,
            format: winston.format.printf(({ level, message, timestamp }) => {
              return `${timestamp} ${level}: ${message}`;
            }),
          }),
        ],
      }),
    ),
  });
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get<string>('APP_ORIGIN'),
    methods: '*',
    allowedHeaders: '*',
    credentials: true,
  });
  await app.listen(8000);
}

bootstrap();
