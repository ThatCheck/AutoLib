import lodash from 'lodash';

export function transformSequelizeValidationError(data) {
  return lodash.reduce(data, function correct(result, item) {
    result[item.field] = item.message;
    return result;
  }, {});
}
