export const STATE = {
  CHANGE_STEP: '@@autolib/register/LOAD',
  VERIFY_MAIL: '@@autolib/register/VERIFY_EMAIL',
  VERIFY_MAIL_SUCCESS: '@@autolib/register/VERIFY_EMAIL_SUCCESS',
  VERIFY_MAIL_FAIL: '@@autolib/register/VERIFY_EMAIL_FAIL',
  REGISTER: '@@autolib/register/REGISTER',
  REGISTER_SUCCESS: '@@autolib/register/REGISTER_SUCCESS',
  REGISTER_FAIL: '@@autolib/register/REGISTER_FAIL'
};

const initialState = {
  verifyingEmail: false,
  registering: false,
  user: {},
  error: false
};


export default function registerReducer(state = initialState, action = {}) {
  switch (action.type) {
    case STATE.VERIFY_MAIL:
      return {
        ...state,
        verifyingEmail: true,
      };
    case STATE.VERIFY_MAIL_SUCCESS:
      return {
        ...state,
        verifyingEmail: false,
        emailAvailable: action.result.length === 0,
      };
    case STATE.VERIFY_MAIL_FAIL:
      return {
        ...state,
        verifyingEmail: false,
        error: true,
      };
    case STATE.REGISTER:
      return {
        ...state,
        registering: true,
      };
    case STATE.REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
      };
    case STATE.REGISTER_FAIL:
      return {
        ...state,
        registering: false,
        error: true,
      };
    default:
      return state;
  }
}

export function verifyEmail(email) {
  return {
    types: [STATE.VERIFY_MAIL, STATE.VERIFY_MAIL_SUCCESS, STATE.VERIFY_MAIL_FAIL],
    promise: (client) => client.get('/users', { params: { email: email} })
  };
}

export function register(email, lastName, firstName, password, confirmPassword) {
  return {
    types: [STATE.REGISTER, STATE.REGISTER_SUCCESS, STATE.REGISTER_FAIL],
    promise: (client) => client.post('/users', { data: { email: email, first_name: firstName, last_name: lastName, password: password, confirm_password: confirmPassword} })
  };
}
