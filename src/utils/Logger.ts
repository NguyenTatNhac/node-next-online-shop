import winston from 'winston';
import { isProdEnv } from './Utilities';

const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
  },
  colors: {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red',
  },
};

const formatter = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.splat(),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;

    return `${timestamp} [${level}]: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
    }`;
  }),
);

const prodTransport = new winston.transports.File({
  filename: 'logs/error.log',
  level: 'error',
});

const consoleTransport = new winston.transports.Console({
  format: formatter,
  level: 'info',
});

const logger = winston.createLogger({
  level: isProdEnv() ? 'error' : 'info',
  levels: customLevels.levels,
  transports: [isProdEnv() ? prodTransport : consoleTransport],
});
winston.addColors(customLevels.colors);

export default class Logger {
  static trace(msg: string, meta?: never) {
    logger.log('trace', msg, meta);
  }

  static debug(msg: string, meta?: never) {
    logger.debug(msg, meta);
  }

  static info(msg: string, meta?: never) {
    logger.info(msg, meta);
  }

  static warn(msg: string, meta?: never) {
    logger.warn(msg, meta);
  }

  static error(msg: string, meta?: unknown) {
    logger.error(msg, meta);
  }

  static fatal(msg: string, meta?: never) {
    logger.log('fatal', msg, meta);
  }
}
