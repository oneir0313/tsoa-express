import { ResponseCode, apiResponses } from '../models/enums/ApiResponse';

export class ApiError extends Error {
    readonly code: ResponseCode;
    readonly status: number;

    constructor(code: Exclude<ResponseCode, 'OK'> = ResponseCode.UNKNOWN, message: string = '', stack = '') {
        const apiError = apiResponses[code];
        super(message || apiError.message);
        this.code = apiError.code;
        this.status = apiError.httpStatus;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
