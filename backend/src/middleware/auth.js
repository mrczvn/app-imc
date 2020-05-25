import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import authConfig from '../config/auth';
import User from '../models/user';

const opts = {
  secretOrKey: authConfig.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

export default () => {
  const strategy = new Strategy(opts, async (payload, done) => {
    try {
      const user = await User.findOne({ where: payload.id });
      if (!user) {
        return done(null, false);
      }
      return done(null, {
        user: user.id,
        email: user.email,
      });
    } catch (error) {
      return done(error, null);
    }
  });

  passport.use(strategy);

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', authConfig.session),
  };
};
