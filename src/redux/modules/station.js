import Immutable from 'immutable';
import lodash from 'lodash';
import StationRecord from 'redux/models/station';

export const STATE = {
  STATION_LOAD: '@@autolib/station/STATION_LOAD',
  STATION_SUCCESS: '@@autolib/station/STATION_SUCCESS',
  STATION_FAIL: '@@autolib/station/STATION_FAIL',
};

const initialState = {
  stations: Immutable.List(),
  loading: false,
  loaded: false
};


export default function registerReducer(state = initialState, action = {}) {
  switch (action.type) {
    case STATE.STATION_LOAD: {
      return {
        ...state,
        loading: true,
      };
    }
    case STATE.STATION_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case STATE.STATION_SUCCESS: {
      const stations = Immutable.fromJS(action.result).map(data => new StationRecord(data));
      return {
        ...state,
        stations: stations,
        loading: false,
        loaded: true
      };
    }
    default:
      return state;
  }
}

export function isLoaded(state) {
  return state.user && state.station.loaded;
}

export function list() {
  return {
    types: [STATE.STATION_LOAD, STATE.STATION_SUCCESS, STATE.STATION_FAIL],
    promise: (client) => client.get('/stations')
  };
}
