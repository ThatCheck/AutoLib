import Immutable from 'immutable';
import lodash from 'lodash';
import UserModel from 'redux/models/users';

export const STATE = {
  USER_LOAD: '@@autolib/dashboard/home/USER_LOAD',
  USER_SUCCESS: '@@autolib/dashboard/home/USER_SUCCESS',
  USER_FAIL: '@@autolib/dashboard/home/USER_FAIL',
};

const initialState = {
  users: {
    data: Immutable.List(),
    loading: false,
    loaded: false
  },
};

export default function registerReducer(state = initialState, action = {}) {
  switch (action.type) {
    case STATE.USER_LOAD: {
      const users = state.user;
      users.loading = true;
      return {
        ...state,
        users: users
      };
    }
    case STATE.USER_FAIL: {
      const users = state.user;
      users.loading = false;
      users.error = action.error;
      return {
        ...state,
        users: users
      };
    }
    case STATE.USER_SUCCESS: {
      const users = state.user;
      users.loading = false;
      users.data = Immutable.fromJS(action.result).map(data => new UserModel(data));
      users.loaded = true;
      return {
        ...state,
        users: users,
      };
    }
    default:
      return state;
  }
}

export function isLoaded(state) {
  return state.user && state.users.loaded;
}

export function list() {
  return {
    types: [STATE.USER_LOAD, STATE.USER_SUCCESS, STATE.USER_FAIL],
    promise: (client) => client.get('/users')
  };
}
