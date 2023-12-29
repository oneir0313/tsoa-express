export interface IUserLonginReqBody {
    /**
     * 帳號
     * @required
     * @maxLength 255
     */
    username: string;

    /**
     * 密碼
     * @required
     */
    password: string;

    /**
     * 推廣碼(代理UUID)
     * @required
     */
    code: string;
}
