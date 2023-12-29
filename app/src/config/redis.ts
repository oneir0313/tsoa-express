import Redis from 'ioredis';
import { envConfig } from './envConfig';
import { logger } from './logger';

const redis = new Redis(
    envConfig.redis.port,
    envConfig.redis.host,
    {
        db: envConfig.redis.db,
        password: envConfig.redis.password,
        connectTimeout: 10000,
        maxRetriesPerRequest: 3
    });
redis.on('connect', () => {
    logger.info('Redis connected.');
});

redis.on('error', (err) => {
    err.message = `Error to connect to the redis: ${err.message}`;
    logger.error(err);
    process.exit();
});
export { redis };
