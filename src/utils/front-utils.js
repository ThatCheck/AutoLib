import lodash from 'lodash';

export function transformSequelizeValidationError(data) {
  lodash.map(data, function correct(item) {
    const obj = {};
    obj[item.field] = item.message;
    return obj;
  });
}
