import dotenv from 'dotenv';
import joi from 'joi';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = joi.object<EnvVarsSchema>()
    .keys({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        NODE_ENV: joi.string().valid('production', 'development').default('production'),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        PORT: joi.number().required(),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        REDIS_HOST: joi.string().required(),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        REDIS_PORT: joi.number().required(),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        REDIS_PASSWORD: joi.string().allow(''),
        // // eslint-disable-next-line @typescript-eslint/naming-convention
        // MYSQL_DATABASE: joi.string().required(),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        MYSQL_HOST: joi.string().required(),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        MYSQL_PASSWORD: joi.string().required(),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        MYSQL_PORT: joi.number().required(),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        MYSQL_USER: joi.string().required(),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        SHOW_SWAGGER: joi.bool().default(false),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        DEFAULT_LOCALE: joi.string().required()
    })
    .unknown();

const result = envVarsSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env, {
        abortEarly: false
    });
const envVars: EnvVarsSchema = result.value;

if (result.error) {
    throw new Error(`Config validation error: ${JSON.stringify(result.error.message)}`);
}

export const envConfig = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    redis: {
        host: envVars.REDIS_HOST,
        password: envVars.REDIS_PASSWORD,
        port: envVars.REDIS_PORT,
        db: 3
    },
    service: {
        name: 'tsoa-express'
    },
    mysql: {
        databases: [
            'tsoa_express'
        ],
        host: envVars.MYSQL_HOST,
        password: envVars.MYSQL_PASSWORD,
        port: envVars.MYSQL_PORT,
        user: envVars.MYSQL_USER
    },
    jwt: {
        secret: 'howdoyouturnthison',
        accessExpirationMinutes: 30,
        refreshExpirationDays: 30,
        resetPasswordExpirationMinutes: 10
    },
    time: {
        defaultTimeZone: 0,
        defaultDateFormat: 'YYYY-MM-DD HH:mm:ss'
    },
    showSwagger: envVars.SHOW_SWAGGER,
    locales: {
        default: envVars.DEFAULT_LOCALE
    }
};

interface EnvVarsSchema {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    NODE_ENV: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    PORT: number;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    REDIS_HOST: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    REDIS_PORT: number;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    REDIS_PASSWORD: string;
    // // eslint-disable-next-line @typescript-eslint/naming-convention
    // MYSQL_DATABASE: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    MYSQL_PASSWORD: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    MYSQL_PORT: number;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    MYSQL_HOST: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    MYSQL_USER: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    SHOW_SWAGGER: boolean;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    DEFAULT_LOCALE: string;
}
