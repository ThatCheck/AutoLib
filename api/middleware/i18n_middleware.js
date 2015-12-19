import {ValidationError} from 'sequelize';
import _ from 'lodash';

export default function(err, req, res, next) {
  console.error(err);
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof ValidationError) {
    _.map(err.errors, (value) => {
      value.message = res.__(value.message);
      return value;
    });
  }
  res.status(err.status || 500);
  res.json(err);
}
