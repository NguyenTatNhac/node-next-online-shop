import winston from 'winston';
import { isProdEnv } from './Utilities';

type LogLevel = 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL';
type CustomLevels = {
  levels: {
    [K in LogLevel]: number;
  };
  colors: {
    [K in LogLevel]: string;
  };
};

const customLevels: CustomLevels = {
  levels: {
    TRACE: 5,
    DEBUG: 4,
    INFO: 3,
    WARN: 2,
    ERROR: 1,
    FATAL: 0,
  },
  colors: {
    TRACE: 'white',
    DEBUG: 'green',
    INFO: 'green',
    WARN: 'yellow',
    ERROR: 'red',
    FATAL: 'red',
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
  level: 'ERROR',
});

const consoleTransport = new winston.transports.Console({
  format: formatter,
  level: 'INFO',
});

const logger = winston.createLogger({
  level: isProdEnv() ? 'ERROR' : 'INFO',
  levels: customLevels.levels,
  transports: [isProdEnv() ? prodTransport : consoleTransport],
});
winston.addColors(customLevels.colors);

/* We forward the "any" "meta" to Winston, therefore "any" is needed */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LogFn = (message: string, ...meta: any[]) => void;
const getLogFn = (level: LogLevel): LogFn => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (message: string, ...meta: any[]) => {
    logger.log(level, message, meta);
  };
};

/* Export an object with our own definition, instead of export the "logger"
 * object from Winston. This will hide all the unnecessary functions from
 * Winston logger. */
export default {
  trace: getLogFn('TRACE'),
  debug: getLogFn('DEBUG'),
  info: getLogFn('INFO'),
  warn: getLogFn('WARN'),
  error: getLogFn('ERROR'),
  fatal: getLogFn('FATAL'),
};
