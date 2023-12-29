import fs from 'fs';
import path from 'path';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { envConfig } from './envConfig';
const logsFolder = path.join(__dirname, '../../logs/');
if (!fs.existsSync(logsFolder)) {
    fs.mkdirSync(logsFolder);
}

const levels = {
    error: 0,
    info: 1,
    http: 2,
    warn: 3,
    debug: 4,
    sql: 5
};

const colors = {
    error: 'red',
    info: 'green',
    http: 'magenta',
    warn: 'yellow',
    debug: 'cyan',
    sql: 'blue'
};

const logFormat = winston.format.printf(({ level, message, timestamp, ...metadata }) => {
    return `${timestamp} ${level}: ${typeof message === 'object' && message !== null ? JSON.stringify(message, null, 4) : message}${metadata.stack ? metadata.stack : ''}`;
});

// Tell winston that you want to link the colors
// defined above to the severity levels.
winston.addColors(colors);

export const logger = winston.createLogger({
    levels,
    level: envConfig.env === 'development' ? 'sql' : 'warn',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.splat(),
        winston.format.json(),
        winston.format.errors({ stack: true })
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), logFormat)
        }),
        new DailyRotateFile({
            filename: logsFolder + '%DATE%.log',
            json: true,
            datePattern: 'YYYYMMDD',
            maxFiles: '30d'
        })
    ],
}) as winston.Logger & Record<keyof typeof levels, winston.LeveledLogMethod>;
