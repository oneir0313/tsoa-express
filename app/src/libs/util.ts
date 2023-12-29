import crypto from 'crypto';
import { Request } from 'express';
import moment from 'moment';
import { envConfig } from '../config/envConfig';

const useConsoleLog = true;

class Util {
    log(message: any, ...optionalParams: any[]) {
        if (useConsoleLog) {
            // eslint-disable-next-line no-console
            console.log(message, optionalParams);
        }
    }

    error(error: any, ...optionalParams: any[]) {
        if (useConsoleLog) {
            // eslint-disable-next-line no-console
            console.error(error, optionalParams);
        }
    }
    //AES解密
    desDecode(desKey: crypto.CipherKey, data: string) {
        try {
            const cipherChunks = [];
            const decipher = crypto.createDecipheriv('aes-128-ecb', desKey, '');
            decipher.setAutoPadding(true);
            cipherChunks.push(decipher.update(data, 'base64', 'utf8'));
            cipherChunks.push(decipher.final('utf8'));
            return cipherChunks.join('');
        }
        catch (err) {
            this.error(err);
            return null;
        }
    }

    //AES加密
    desEncode(desKey: crypto.CipherKey, data: string) {
        try {
            const cipherChunks = [];
            const cipher = crypto.createCipheriv('aes-128-ecb', desKey, '');
            cipher.setAutoPadding(true);
            cipherChunks.push(cipher.update(data, 'utf8', 'base64'));
            cipherChunks.push(cipher.final('base64'));

            return cipherChunks.join('');
        }
        catch (err) {
            this.error(err);
            return null;
        }
    }

    //AES 256加密
    des256Encode(desKey: crypto.CipherKey, data: string) {
        try {
            const cipherChunks = [];
            const cipher = crypto.createCipheriv('aes-256-ecb', desKey, '');
            cipher.setAutoPadding(true);
            cipherChunks.push(cipher.update(data, 'utf8', 'base64'));
            cipherChunks.push(cipher.final('base64'));

            return cipherChunks.join('');
        }
        catch (err) {
            this.error(err);
            return null;
        }
    }

    //AES 256解密
    des256Decode(desKey: crypto.CipherKey, data: string) {
        try {
            const cipherChunks = [];
            const decipher = crypto.createDecipheriv('aes-256-ecb', desKey, '');
            decipher.setAutoPadding(true);
            cipherChunks.push(decipher.update(data, 'base64', 'utf8'));
            cipherChunks.push(decipher.final('utf8'));
            return cipherChunks.join('');
        }
        catch (err) {
            this.error(err);
            return null;
        }
    }

    //钱转游戏币
    moneyToGold(money: number) {
        return (money * 100).toFixed(0);
    }

    //金币转钱
    goldToMoney(money: number) {
        return (money / 100).toFixed(2);
    }

    //获取ip
    getIp(req: Request) {
        let ip = req.get('x-real-ip') || req.get('x-forwarded-for') || req.socket.remoteAddress || '';
        const ips = ip.split(',');
        if (ips.length > 0) {
            ip = ips[0];
        }
        return ip;
    }

    //判断输入框中输入的日期格式为yyyy-mm-dd和正确的日期
    isDate(str: string) {
        if (str === '') {
            return true;
        }

        const reg = /^(\d{4})-(\d{2})-(\d{2})$/;

        if (!reg.test(str) && +RegExp.$2 <= 12 && +RegExp.$3 <= 31) {
            return false;
        }
        return true;
    }

    //获取URL
    getURL(req: Request) {
        const url = req.headers.referer;
        return url;
    }

    dateFormat(timeZone: number, format: string, time: string) {
        if (Date.parse(time) && isNaN(+time)) {
            return time;
        }

        if (!timeZone) {
            timeZone = envConfig.time.defaultTimeZone;
        }

        if (!format) {
            format = envConfig.time.defaultDateFormat;
        }

        if (time) {
            return moment(Number(time)).utcOffset(timeZone).format(format);
        }
        else {
            return moment().utcOffset(timeZone).format(format);
        }
    }
}

export const util = new Util();
