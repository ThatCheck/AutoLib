import passport from 'passport';
import usersRoute from './user.js';
import userController from '../controllers/user';
import MapsController from '../controllers/maps';
export default function(app) {
  app.post('/login', passport.authenticate('local'), userController.login);

  app.get('/maps', MapsController.calculateMinPath );
}
