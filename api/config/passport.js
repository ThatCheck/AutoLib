import db from '../models/index';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as JwtStrategy} from 'passport-jwt';
import config from '../config/config.json';
import jwt from 'jsonwebtoken';
import wrap from '../utils/wrap';

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.User.find(id).then(function(user) {
    done(null, user);
  });
});

/**
 * Configuration the locale JwtStrategy
 */
const opts = {};
opts.secretOrKey = config.SECRET_WEB_TOKEN;
passport.use(new JwtStrategy(opts, wrap(async function(jwt_payload, done) {
  const user = await db.User.findOne({ where: {email: jwt_payload.sub} });
  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
})));

/**
 * Configure the local strategy (email and mdp)
 */
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
},
  function(email, password, done) {
    db.User.find({
      where: {
        email: email
      }
    })
      .then(function(user) {
        if (!user) {
          return done(null, false, {
            message: 'Invalid email or password.'
          });
        }
        user.comparePassword(password, function(err, isMatch) {
          if (isMatch) {
            const opt = {
              expiresIn: 60 * 60 * 24 * 7,
              subject: user.email,
            };
            user.token = jwt.sign({}, config.SECRET_WEB_TOKEN, opt);
            return done(null, user);
          } else {
            return done(null, false, {
              message: 'Invalid email or password'
            });
          }
        });
      });
  }));
