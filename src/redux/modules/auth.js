import cookie from 'react-cookie';

const LOAD = '@@autolib/auth/LOAD';
const LOAD_SUCCESS = '@@autolib/auth/LOAD_SUCCESS';
const LOAD_FAIL = '@@autolib/auth/LOAD_FAIL';
const LOGIN = '@@autolib/auth/LOGIN';
const LOGIN_SUCCESS = '@@autolib/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = '@@autolib/auth/LOGIN_FAIL';
const LOGOUT = '@@autolib/auth/LOGOUT';
const LOGOUT_SUCCESS = '@@autolib/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = '@@autolib/auth/LOGOUT_FAIL';
const LOAD_AUTH_COOKIE = '@@autolib/auth/LOAD_AUTH_COOKIE';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      cookie.save('user', action.result);
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOAD_AUTH_COOKIE:
      const cookieData = cookie.load('user');
      const user = cookieData ? cookieData.user : null;
      return {
        ...state,
        user
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function loadAuthCookie() {
  return {
    type: LOAD_AUTH_COOKIE
  };
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/users/' + cookie.load('user').user.id)
  };
}

export function login(email, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/login', {
      data: {
        email: email,
        password: password
      }
    })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
}
