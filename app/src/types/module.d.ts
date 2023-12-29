import { IUser } from './models/viewModel/user';

declare global {
    // eslint-disable-next-line no-var, @typescript-eslint/naming-convention
    var NULL: null;

    interface Request {
        user: IUser;
    }
}
