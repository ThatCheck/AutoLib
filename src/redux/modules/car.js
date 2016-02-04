import Immutable from 'immutable';
import lodash from 'lodash';
import CarRecord from 'redux/models/car';

export const STATE = {
  CAR_LOAD: '@@autolib/car/CAR_LOAD',
  CAR_SUCCESS: '@@autolib/car/CAR_SUCCESS',
  CAR_FAIL: '@@autolib/car/CAR_FAIL',
  CAR_UPDATE_POSITION: '@@autolib/car/CAR_UPDATE_POSITION'
};

const initialState = {
  cars: Immutable.List(),
  loading: false,
  loaded: false
};


export default function registerReducer(state = initialState, action = {}) {
  switch (action.type) {
    case STATE.CAR_UPDATE_POSITION: {
      console.log('update cars position');
      const cars = state.cars.update(
        state.cars.findIndex(
          function find(item) {
            console.log(item.get('idVehicule'), action.result.idVehicule);
            return item.get('idVehicule') === action.result.idVehicule;
          }),
          function update(item) {
            let returnValue = item;
            returnValue = returnValue.set('latitude', action.result.lat);
            returnValue = returnValue.set('longitude', action.result.lng);
            return returnValue;
          }
      );
      return {
        ...state,
        cars: cars
      };
    }
    case STATE.CAR_LOAD: {
      return {
        ...state,
        loading: true,
      };
    }
    case STATE.CAR_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case STATE.CAR_SUCCESS: {
      const cars = Immutable.fromJS(action.result).map(data => new CarRecord(data));
      return {
        ...state,
        cars: cars,
        loading: false,
        loaded: true
      };
    }
    default:
      return state;
  }
}

export function updatePosition(idVehicule, lng, lat) {
  console.log('CALL UPDATE POSITION');
  return {
    type: STATE.CAR_UPDATE_POSITION,
    result: {idVehicule: idVehicule, lng: lng, lat: lat}
  };
}

export function isLoaded(state) {
  return state.user && state.car.loaded;
}

export function list() {
  return {
    types: [STATE.CAR_LOAD, STATE.CAR_SUCCESS, STATE.CAR_FAIL],
    promise: (client) => client.get('/cars')
  };
}
