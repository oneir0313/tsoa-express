import * as bcrypt from 'bcrypt';
import passport from 'passport';
import * as passportJWT from 'passport-jwt';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { envConfig } from '../config/envConfig';
import { TsoaExpress } from '../models/auto/tsoa_express/models';
import { Ii18nRequest } from '../models/viewModels/general';

const authenticateUser = new passport.Passport();

// Setup passport strategy
authenticateUser.use(
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req: Ii18nRequest, username: string, password: string, done: any) => {
            try {


                const user = await TsoaExpress.User.findOne({ where: { username } });

                if (!user) {
                    return done(null, false, { message: req.t('accountPasswordErrorMsg') });
                }
                if (user.status === 0) {
                    return done(null, false, { message: req.t('accountSuspended') });
                }

                const hashPass = /^\$2y\$/.test(user.password) ? '$2b$' + user.password.slice(4) : user.password;

                if (!bcrypt.compareSync(password, hashPass)) {
                    return done(null, false, { message: req.t('accountPasswordErrorMsg') });
                }

                await user.update({ loginAt: new Date() });

                return done(null, user);
            }
            catch (error) {
                return done(error);
            }
        }
    )
);

// Serialize and deserialize user
authenticateUser.serializeUser((user: any, cb: any) => {
    cb(null, { serial: user.id });
});

authenticateUser.deserializeUser((user: any, cb: any) => {
    TsoaExpress.User.findByPk(user.id).then((_user: any) => {
        return cb(null, _user);
    });
});

const jwtOptions: passportJWT.StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: envConfig.jwt.secret
};

authenticateUser.use(new JwtStrategy(jwtOptions, function (jwtPayload: any, next: any) {
    TsoaExpress.User.findByPk(jwtPayload.id).then((user: any) => {
        if (!user) {
            return next(null, false);
        }
        return next(null, user);
    });
})
);

export { authenticateUser };
