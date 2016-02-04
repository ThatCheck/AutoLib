import Immutable from 'immutable';
import lodash from 'lodash';
import BorneRecord from 'redux/models/borne';

export const STATE = {
  BORNE_LOAD: '@@autolib/borne/BORNE_LOAD',
  BORNE_SUCCESS: '@@autolib/borne/BORNE_SUCCESS',
  BORNE_FAIL: '@@autolib/borne/BORNE_FAIL',
};

const initialState = {
  bornes: Immutable.List(),
  loading: false,
  loaded: false
};


export default function registerReducer(state = initialState, action = {}) {
  switch (action.type) {
    case STATE.BORNE_LOAD: {
      return {
        ...state,
        loading: true,
      };
    }
    case STATE.BORNE_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case STATE.BORNE_SUCCESS: {
      const bornes = Immutable.fromJS(action.result).map(data => new BorneRecord(data));
      return {
        ...state,
        bornes: bornes,
        loading: false,
        loaded: true
      };
    }
    default:
      return state;
  }
}

export function isLoaded(state) {
  return state.user && state.borne.loaded;
}

export function list() {
  return {
    types: [STATE.BORNE_LOAD, STATE.BORNE_SUCCESS, STATE.BORNE_FAIL],
    promise: (client) => client.get('/bornes')
  };
}
