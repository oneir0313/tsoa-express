import { I18n } from 'i18n';

import fs from 'fs';
import { default as path, default as pathHelper } from 'path';
import { envConfig } from './envConfig';
import { logger } from './logger';
const directory = pathHelper.join(pathHelper.resolve(), 'locales');
const locales = [];
const files = fs.readdirSync(directory);

const jsonFiles = files.filter(file => path.extname(file) === '.json');
locales.push(...jsonFiles.map(file => path.parse(file).name));

if (locales.length === 0) {
    throw new Error(`未找到语言文件，请检查 ${directory} 内的档案`);
}

const i18n = new I18n();
const defaultLocale = envConfig.locales.default;
i18n.configure({
    locales,
    directory,
    defaultLocale,
    retryInDefaultLocale: false,
    header: '',
    cookie: 'lang',
    autoReload: true,
    syncFiles: false,
    updateFiles: false,
    queryParameter: 'lang',
    api: {
        __: 't',
        __n: 'tn'
    },
    missingKeyFn: function (locale, value) {
        if (value === '') {
            return undefined;
        }
        logger.warn(`缺少翻译: 语系 = ${locale}, key = ${value}`);
        return value;
    }
});

export { i18n };
