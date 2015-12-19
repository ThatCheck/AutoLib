import validator from 'validate.js';
import _ from 'lodash';

export default function validate(data, rules, res) {
  const result = validator(data, rules);
  return _.forOwn(result, (value) => {
    return _.map(value, (toConvert) => {
      return res.__(toConvert);
    });
  });
}
