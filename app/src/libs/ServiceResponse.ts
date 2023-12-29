import { FieldErrors } from 'tsoa';
import { apiResponses, ResponseCode } from '../models/enums/ApiResponse';

export class ServiceResponse {
    code: string;
    message: string;
    body: any | FieldErrors;
    codeNO: number;

    constructor(code: ResponseCode = ResponseCode.OK, body: any = null, message = '') {
        const apiRes = apiResponses[code];
        this.body = body;
        this.code = apiRes.code;
        this.codeNO = apiRes.codeNO;
        this.message = message || apiRes.message;
    }
}
