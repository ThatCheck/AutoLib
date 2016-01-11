import { createValidator } from 'utils/validatorCompiler';

const constraints = {
  email: {
    presence: true,
    email: true,
  },
  password: {
    presence: true,
  }
};

export default createValidator(constraints);
