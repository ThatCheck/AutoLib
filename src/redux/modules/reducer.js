import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerStateReducer } from 'redux-router';
import {reducer as form} from 'redux-form';

/**
 * Custom reducer
 */
import auth from './auth';
import registerReducer from './register';

export default combineReducers({
  router: routerStateReducer,
  auth,
  form,
  register: registerReducer
});
