import http from 'http';
import util from 'util';
import { app } from './app';
import { envConfig } from './config/envConfig';
import { logger } from './config/logger';

const port = normalizePort(envConfig.port);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: number | string): number | string | boolean {
    const portNumber: number = typeof val === 'string' ? parseInt(val, 10) : val;
    if (isNaN(portNumber)) {
        return val;
    }
    else if (portNumber >= 0) {
        return portNumber;
    }
    else {
        return false;
    }
}

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            logger.error(`${bind} requires elevated privileges`);
            break;
        case 'EADDRINUSE':
            logger.error(`${bind} is already in use`);
            break;
        default:
            throw error;
    }
}

function onListening(): void {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    logger.info(`Server Started, listen on ${bind}...`);
    logger.info(`env config: ${util.inspect(envConfig, { colors: true })}`);
}
