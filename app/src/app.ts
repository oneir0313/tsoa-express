import RedisStore from 'connect-redis';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import session from 'express-session';
import helmet from 'helmet';
import { serve, setup } from 'swagger-ui-express';
import xss from 'xss-clean';
import swagger from '../swagger.json';
import { envConfig } from './config/envConfig';
import { i18n } from './config/i18n';
import { morganMiddleware } from './config/morgan';
import { redis } from './config/redis';
import { ApiError } from './libs/ApiError';
import { errorHandler } from './middlewares/errorHandler';
import { authenticateUser } from './middlewares/passport';
import { ResponseCode } from './models/enums/ApiResponse';
import { RegisterRoutes } from './routes/routes';

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.configure();
        this.routes();
    }

    configure(): void {
        this.app.use(morganMiddleware);
        if (envConfig.env === 'production') {
            // set security HTTP headers
            this.app.use(helmet());
        }

        // parse json request body
        this.app.use(express.json());

        // parse urlencoded request body
        this.app.use(express.urlencoded({ extended: true }));

        // sanitize request data
        this.app.use(xss());

        // enable cors
        this.app.use(cors());
        this.app.options('*', cors());

        // req cookie MW
        this.app.use(cookieParser());

        // Session MW
        const sessionConfig: session.SessionOptions = {
            store: new RedisStore({ client: redis }),
            name: 'player',
            secret: 'player',
            cookie: { secure: envConfig.env === 'production', maxAge: 86400000 },
            resave: false,
            saveUninitialized: false,
            proxy: true
        };
        this.app.use(session(sessionConfig));

        // Passport MW
        this.app.use(authenticateUser.initialize());
        this.app.use(authenticateUser.session());

        // i18n MW
        this.app.use(i18n.init);
    }

    routes(): void {
        // Call Routes
        RegisterRoutes(this.app);

        if (envConfig.showSwagger) {
            this.app.use('/api', serve, setup(swagger, null, {
                persistAuthorization: true
            }));
        }

        // send back a 404 error for any unknown api request

        this.app.use((req, res) => {
            throw new ApiError(ResponseCode.NOT_FOUND, `${req.method} ${req.originalUrl} is not found`);
        });

        this.app.use(errorHandler);

    }
}

export const app = new App().app;
