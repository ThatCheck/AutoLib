export default {
  // SUCCESS
  OK         : 200,
  CREATED    : 201,
  ACCEPTED   : 202,
  NO_CONTENT : 204,

  // REDIRECTION
  MOVED_PERMANENTLY : 301,
  MOVED_TEMPORARY   : 302,
  NOT_MODIFIED      : 304,

  // CLIENT ERROR
  BAD_REQUEST                   : 400,
  UNAUTHORIZED                  : 401,
  PAYMENT_REQUIRED              : 402,
  FORBIDDEN                     : 403,
  NOT_FOUND                     : 404,
  METHOD_NOT_ALLOWED            : 405,
  NOT_ACCEPTABLE                : 406,
  PRECONDITION_FAILED           : 412,
  REQUEST_ENTITY_TOO_LARGE      : 413,
  REQUEST_URI_TOO_LONG          : 414,
  UNSUPPORTED_MEDIA_TYPE        : 415,
  REQUESTED_RANGE_UNSATISFIABLE : 416,
  EXPECTATION_FAILED            : 417,
  UNPROCESSABLE_ENTITY          : 422,
  LOCKED                        : 423,
  TOO_MANY_REQUESTS             : 429,

  // SERVER ERRORS
  INTERNAL_SERVER_ERROR : 500,
  NOT_IMPLEMENTED       : 501,
  BAD_GATEWAY           : 502,
  PROXY_ERROR           : 502,
  SERVICE_UNAVAILABLE   : 503,
  GATEWAY_TIMEOUT       : 504
};
