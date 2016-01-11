export default {
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
  confirm_password: {
    equality: 'password'
  }
};
