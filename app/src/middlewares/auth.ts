import { Request } from 'express';
import { ApiError } from '../libs/ApiError';
import { authenticateUser } from '../middlewares/passport';
import { ResponseCode } from '../models/enums/ApiResponse';

export async function expressAuthentication(req: Request, securityName: string, scopes?: string[]) {
    switch (securityName) {
        case 'jwt': {
            const strategy = authenticateUser.authenticate(securityName, {
                session: false
            });

            const authResult = await new Promise((resolve, reject) =>
                strategy(req, req.res, (err: Error) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(req.user);
                    }
                })
            );
            return authResult;
        }
        case 'local':
        default: {
            return new Promise((resolve, reject) => {
                if (!req.isAuthenticated()) {
                    reject(new ApiError(ResponseCode.UNAUTHENTICATED));
                }
                resolve(req.user);
            });
        }
    }
}
