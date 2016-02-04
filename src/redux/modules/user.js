import Immutable from 'immutable';
import lodash from 'lodash';
import UserRecord from 'redux/models/users';

export const STATE = {
  USER_LOAD: '@@autolib/user/USER_LOAD',
  USER_SUCCESS: '@@autolib/user/USER_SUCCESS',
  USER_FAIL: '@@autolib/user/USER_FAIL',
};

const initialState = {
  users: Immutable.List(),
  loading: false,
  loaded: false
};


export default function registerReducer(state = initialState, action = {}) {
  switch (action.type) {
    case STATE.USER_LOAD: {
      return {
        ...state,
        loading: true,
      };
    }
    case STATE.USER_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case STATE.USER_SUCCESS: {
      const user = Immutable.fromJS(action.result).map(data => new UserRecord(data)).toArray();
      return {
        ...state,
        users: user,
        loading: false,
        loaded: true
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
