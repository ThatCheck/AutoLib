import Immutable from 'immutable';
import lodash from 'lodash';

export const STATE = {
  MAPS_LOAD: '@@autolib/maps/MAPS_LOAD',
  MAPS_SUCCESS: '@@autolib/maps/MAPS_SUCCESS',
  MAPS_FAIL: '@@autolib/maps/MAPS_FAIL',
};

const initialState = {
  loading: false,
  loaded: false,
  from: null,
  to: null
};


export default function registerReducer(state = initialState, action = {}) {
  switch (action.type) {
    case STATE.MAPS_LOAD: {
      return {
        ...state,
        loading: true,
      };
    }
    case STATE.MAPS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case STATE.MAPS_SUCCESS: {
      return {
        ...state,
        from: action.result.from,
        to: action.result.to,
        loading: false,
        loaded: true
      };
    }
    default:
      return state;
  }
}

export function isLoaded(state) {
  return state.user && state.maps.loaded;
}

export function found(from, to) {
  return {
    types: [STATE.MAPS_LOAD, STATE.MAPS_SUCCESS, STATE.MAPS_FAIL],
    promise: (client) => client.get('/maps', {
      params: {
        latitude_from: from[0],
        longitude_from: from[1],
        latitude_to: to[0],
        longitude_to: to[1],
      }
    })
  };
}
