import { Body, Controller, Get, Middlewares, Post, Request, Route, Security, Tags } from 'tsoa';
import { ServiceResponse } from '../libs/ServiceResponse';
import { ResponseCode } from '../models/enums/ApiResponse';
import { IUserLonginReqBody } from '../models/viewModels/user';
import { userService } from '../services/userService';

@Route('user')
@Tags('user')
export class UserController extends Controller {
    /**
     * 登入的敘述
     * @summary 登入
     * @param user
     * @param req
     */
    @Middlewares(userService.localPassport)
    @Post('signin')
    async login(
        @Body() user: IUserLonginReqBody,
        @Request() req: Express.Request) {

        return new ServiceResponse(ResponseCode.OK);
    }

    /**
     * 登入的敘述
     * @summary 登入
     * @param user
     * @param req
     */
    @Security('local')
    @Get('session')
    async session(
        @Request() req: Express.Request) {
        return new ServiceResponse(ResponseCode.OK, req.user);
    }
}
