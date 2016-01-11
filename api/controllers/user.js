import db from '../models/index.js';
import wrap from '../utils/wrap';
import validator from '../utils/validator';
import HTTP_CODE from '../utils/HTTP_CODE.js';
import verifyEmailValidator from '../validator/user/VerifyEmailValidator';
import createUserValidator from '../validator/user/UserValidator';
import epilogueErrors from 'epilogue';
const UserController = {
    /**
    * configure Rest Service
    * @param epilogue
     */
  configureRestService: function configure(epilogue) {

    const userResource = epilogue.resource({
      model: db.User,
      endpoints: ['/users', '/users/:id']
    });

      /**
       * Add validation on creation
       */
    userResource.create.start(function start(req, res, context) {
      const data = {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
      };
      const result = validator(data, createUserValidator, res);
      if (result !== undefined) {
        context.error(new epilogueErrors.Errors.BadRequestError('Malformed User Entity', result));
      }else {
        context.continue();
      }
    });
  },

  login: wrap(async function login(req, res) {
    const obj = {
      token: req.user.token,
      user: req.user
    };
    res.status(HTTP_CODE.OK).json(obj);
  })

};

export default UserController;
