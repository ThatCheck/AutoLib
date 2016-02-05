import Immutable from 'immutable';
import lodash from 'lodash';
import ClientRecord from 'redux/models/client';

export const STATE = {
  CLIENT_LOAD: '@@autolib/client/CLIENT_LOAD',
  CLIENT_SUCCESS: '@@autolib/client/CLIENT_SUCCESS',
  CLIENT_FAIL: '@@autolib/client/CLIENT_FAIL',
};

const initialState = {
  clients: Immutable.List(),
  loading: false,
  loaded: false
};


export default function registerReducer(state = initialState, action = {}) {
  switch (action.type) {
    case STATE.CLIENT_LOAD: {
      return {
        ...state,
        loading: true,
      };
    }
    case STATE.CLIENT_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case STATE.CLIENT_SUCCESS: {
      const user = Immutable.fromJS(action.result).map(data => new ClientRecord(data));
      return {
        ...state,
        clients: user,
        loading: false,
        loaded: true
      };
    }
    default:
      return state;
  }
}

export function isLoaded(state) {
  return state.user && state.client.loaded;
}

export function list() {
  return {
    types: [STATE.CLIENT_LOAD, STATE.CLIENT_SUCCESS, STATE.CLIENT_FAIL],
    promise: (client) => client.get('/clients')
  };
}
