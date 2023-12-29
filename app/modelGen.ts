/* eslint-disable no-console */
import events from 'events';
import fs from 'fs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import i from 'i';
import path from 'path';
import readline from 'readline';
import SequelizeAuto from 'sequelize-auto';
import { envConfig } from './src/config/envConfig';

async function run() {
    console.log(envConfig);
    const output = './src/models/auto';
    const inflect = i();
    fs.rmSync(output, { recursive: true, force: true });
    console.log('remove', output);

    for (const database of envConfig.mysql.databases) {
        try {
            const auto = new SequelizeAuto(database, envConfig.mysql.user, envConfig.mysql.password, {
                host: envConfig.mysql.host,
                dialect: 'mysql',
                directory: path.join(output, database), // where to write files
                port: envConfig.mysql.port,
                caseModel: 'p',
                caseFile: 'c', // file names created for each model use camelCase.js not snake_case.js,
                caseProp: 'c', // convert snake_case column names to camelCase field names: user_id -> userId
                singularize: true, // convert plural table names to singular model names
                additional: {
                    timestamps: false,
                    // ...options added to each model
                },
                lang: 'ts',
                useDefine: true,
                indentation: 4,
                views: true
            });

            console.log(`parse database ${database}...`);

            // TODO: 攔截不到錯誤
            const data = await auto.run();
            const intiModelsPath = path.join(output, database, 'init-models.ts');
            const rl = readline.createInterface({
                input: fs.createReadStream(intiModelsPath),
            });
            const lines: string[] = [];
            rl.on('line', line => {
                if (line.includes('.belongsTo(') || line.includes('hasMany(')) {
                    const matches = /(\w+)\.(belongsTo|hasMany)\((\w+), \{(.+)\}/.exec(line);

                    if (matches?.length !== 5) {
                        throw new Error('ORM model 格式非預期\n' + line);
                    }

                    const [, source, relation, target, optionsText] = matches;
                    const pairs = optionsText.split(',');
                    const options: Record<string, string> = pairs.reduce((obj, pair) => {
                        const [key, value] = pair.split(':');
                        obj[key.trim()] = JSON.parse(value.trim());
                        return obj;
                    }, {});
                    // const relation = data.relations.find(r => r.parentId === options.foreignKey && r.childModel === source && r.parentModel === target);

                    // if (!relation) {
                    //     throw new Error("cannot find relation: " + line);
                    // }

                    // TODO: 如果 foreign key 不是 id?
                    options[relation === 'belongsTo' ? 'targetKey' : 'sourceKey'] = 'id';
                    line = line.replace(optionsText, JSON.stringify(options).slice(1, -1));
                }
                lines.push(line);
            });
            await events.once(rl, 'close');
            fs.writeFileSync(intiModelsPath, lines.join('\r\n') + '\r\n', 'utf-8');

            const models = `
import { Sequelize } from "sequelize";
import { envConfig } from "../../../config/envConfig";
import { logger } from "../../../config/logger";
import { initModels } from "./init-models";

export const sequelizeOption = new Sequelize({
    database: "${database}",
    dialect: "mysql",
    host: envConfig.mysql.host,
    password: envConfig.mysql.password,
    port: envConfig.mysql.port,
    username: envConfig.mysql.user,
    logging: (msg) => { logger.sql(\`\\x1b[36m\${msg}\\x1b[0m\`); },
    timezone: \`+0${envConfig.time.defaultTimeZone.toString()}:00\`
});
sequelizeOption.authenticate()
    .then(function () {
        logger.info(\`Database hogo_br_sale connected.\`);
    })
    .catch(function (err) {
        err.message = \`Error to connect to the database hogo_br_sale: \${err.message}\`;
        logger.error(err);
        process.exit();
    });
export const ${inflect.camelize(database)} = initModels(sequelizeOption);
`;
            fs.writeFileSync(path.join(output, database, 'models.ts'), models, 'utf-8');
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
}

run();
