import validator from 'validate.js';

export function createValidator(rules) {
  return (data = {}) => {
    return validator(data, rules) || {};
  };
}
