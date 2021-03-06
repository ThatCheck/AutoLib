import Immutable from 'immutable';
import lodash from 'lodash';
import BookingRecord from 'redux/models/booking';

export const STATE = {
  BOOKING_LOAD: '@@autolib/booking/BOOKING_LOAD',
  BOOKING_SUCCESS: '@@autolib/booking/BOOKING_SUCCESS',
  BOOKING_FAIL: '@@autolib/booking/BOOKING_FAIL',
  BOOKING_ADD_SUCCESS: '@@autolib/booking/BOOKING_ADD_SUCCESS',
};

const initialState = {
  bookings: Immutable.List(),
  loading: false,
  loaded: false
};


export default function registerReducer(state = initialState, action = {}) {
  switch (action.type) {
    case STATE.BOOKING_LOAD: {
      return {
        ...state,
        loading: true,
      };
    }
    case STATE.BOOKING_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case STATE.BOOKING_SUCCESS: {
      const bookings = Immutable.fromJS(action.result).map(data => new BookingRecord(data));
      return {
        ...state,
        bookings: bookings,
        loading: false,
        loaded: true
      };
    }
    case STATE.BOOKING_ADD_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true
      };
    }
    default:
      return state;
  }
}

export function isLoaded(state) {
  return state.user && state.booking.loaded;
}

export function list() {
  return {
    types: [STATE.BOOKING_LOAD, STATE.BOOKING_SUCCESS, STATE.BOOKING_FAIL],
    promise: (client) => client.get('/bookings')
  };
}

export function add(vehicule, clientData, dateReservation, dateEcheance) {
  return {
    types: [STATE.BOOKING_LOAD, STATE.BOOKING_ADD_SUCCESS, STATE.BOOKING_FAIL],
    promise: (client) => client.post('/bookings', {
      data: {
        vehicule: vehicule,
        client: clientData,
        date_reservation: dateReservation,
        date_echeance: dateEcheance
      }
    })
  };
}
