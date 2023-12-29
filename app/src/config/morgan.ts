import morgan from 'morgan';
import { logger } from './logger';

export const morganMiddleware = morgan('short', {
    skip: (req, res) => req.url === '/api/health',
    stream: { write: (message) => logger.http(message.trim()) },
});
