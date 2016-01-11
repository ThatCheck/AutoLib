import { createValidator } from 'utils/validatorCompiler';

const constraints = {
  email: {
    presence: true,
    email: true,
  },
  last_name: {
    presence: true,
  },
  first_name: {
    presence: true,
  },
  password: {
    presence: true,
  },
  confirmPassword: {
    equality: 'password'
  }
};

export default createValidator(constraints);
