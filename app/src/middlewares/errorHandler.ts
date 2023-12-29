import { NextFunction, Request, Response } from 'express';
import { ValidateError } from 'tsoa';
import { logger } from '../config/logger';
import { ApiError } from '../libs/ApiError';
import { ServiceResponse } from '../libs/ServiceResponse';
import { ResponseCode, apiResponses } from '../models/enums/ApiResponse';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    let errRes: ServiceResponse;
    if (err instanceof ValidateError) {
        errRes = new ServiceResponse(ResponseCode.INVALID_ARGUMENT, err.fields);
    }
    else if (err instanceof ApiError) {
        errRes = new ServiceResponse(err.code, null, err.message);
    }
    else {
        errRes = new ServiceResponse(ResponseCode.UNKNOWN, err.message);
    }
    logger.error(err);
    res.status(apiResponses[errRes.code].httpStatus).json(errRes);
}
