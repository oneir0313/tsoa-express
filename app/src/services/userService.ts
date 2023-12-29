import { NextFunction, Request, Response } from 'express';
import { IVerifyOptions } from 'passport-local';
import { ApiError } from '../libs/ApiError';
import { authenticateUser } from '../middlewares/passport';
import { User } from '../models/auto/tsoa_express/user';
import { ResponseCode } from '../models/enums/ApiResponse';

class UserService {
    localPassport(req: Request, res: Response, next: NextFunction): void {
        authenticateUser.authenticate('local', (err: Error, user: User, info: IVerifyOptions) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(new ApiError(ResponseCode.PERMISSION_DENIED, info.message));
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                next();
            });
        })(req, res, next);
    }
}
export const userService = new UserService();
