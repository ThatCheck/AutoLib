import Immutable from 'immutable';
import lodash from 'lodash';
import UseRecord from 'redux/models/use';

export const STATE = {
  USE_SINGLE_LOAD: '@@autolib/use/USE_SINGLE_LOAD',
  USE_SINGLE_SUCCESS: '@@autolib/use/USE_SINGLE_SUCCESS',
  USE_SINGLE_FAIL: '@@autolib/use/USE_SINGLE_FAIL',
};

const initialState = {
  inUse: Immutable.List(),
  loading: false,
  loaded: false
};


export default function registerReducer(state = initialState, action = {}) {
  switch (action.type) {
    case STATE.USE_SINGLE_LOAD: {
      return {
        ...state,
        loading: true,
      };
    }
    case STATE.USE_SINGLE_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case STATE.USE_SINGLE_SUCCESS: {
      const inUse = Immutable.fromJS(action.result).map(data => new UseRecord(data)).toArray();
      return {
        ...state,
        inUse: inUse,
        loading: false,
        loaded: true
      };
    }
    default:
      return state;
  }
}

export function isLoaded(state) {
  return state.user && state.use.loaded;
}

export function list() {
  return {
    types: [STATE.USE_SINGLE_LOAD, STATE.USE_SINGLE_SUCCESS, STATE.USE_SINGLE_FAIL],
    promise: (client) => client.get('/use')
  };
}
