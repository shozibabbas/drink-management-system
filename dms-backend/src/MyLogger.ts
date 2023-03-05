import { ConsoleLogger, LogLevel } from '@nestjs/common';

export class MyLogger extends ConsoleLogger {
  winstonLogger;

  constructor(winstonLogger) {
    super();
    this.winstonLogger = winstonLogger;
  }

  debug(message: any, ...optionalParams: any[]): any {
    super.debug(message, ...optionalParams);
    this.winstonLogger.debug(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]): any {
    this.winstonLogger.error(message, ...optionalParams);
    return super.error(message, ...optionalParams);
  }

  log(message: any, ...optionalParams: any[]): any {
    this.winstonLogger.log(message, ...optionalParams);
    return super.log(message, ...optionalParams);
  }

  setLogLevels(levels: LogLevel[]): any {
    this.winstonLogger.setLogLevels(levels);
    return super.setLogLevels(levels);
  }

  verbose(message: any, ...optionalParams: any[]): any {
    this.winstonLogger.verbose(message, ...optionalParams);
    return super.verbose(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]): any {
    this.winstonLogger.warn(message, ...optionalParams);
    return super.warn(message, ...optionalParams);
  }
}
