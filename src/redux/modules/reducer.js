import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerStateReducer } from 'redux-router';
import {reducer as form} from 'redux-form';

/**
 * Custom reducer
 */
import auth from './auth';
import registerReducer from './register';
import user from './user';
import homeDashboard from './homeDashboard';
import booking from './booking';
import client from './client';
import use from './use';
import borne from './borne';
import station from './station';
import car from './car';
import maps from './maps';

export default combineReducers({
  router: routerStateReducer,
  auth,
  form,
  users: user,
  register: registerReducer,
  booking: booking,
  client: client,
  use: use,
  station: station,
  borne: borne,
  car: car,
  maps: maps
});
