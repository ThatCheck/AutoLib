import passport from 'passport';
import usersRoute from './user.js';
import userController from '../controllers/user';

export default function(app) {
  app.post('/login', passport.authenticate('local'), userController.login);
}
