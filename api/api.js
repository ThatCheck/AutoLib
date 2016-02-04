require('../server.babel'); // babel registration (runtime transpilation for node)
import express from 'express';
import bodyParser from 'body-parser';
import config from '../src/config';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';
import passport from 'passport';
import pass from 'config/passport';
import db from 'models/index';
import i18n from 'i18n';
import morgan from 'morgan';
import routes from 'routes/index.js';
import validate from 'validate.js';
import i18n_middleware from 'middleware/i18n_middleware';
import epilogue from 'epilogue';
import * as Controller from 'controllers/index.js';
import redis from 'redis';

validate.validators.presence.options = {
  message: 'VALIDATEJS.ERROR.REQUIRED'
};
validate.options = {fullMessages: false};

/**
 * Sync the DB
 */
const pretty = new PrettyError();
const app = express();

const server = new http.Server(app);

const io = new SocketIo(server);
io.path('/ws');

/**
 * Configure i18n
 */
i18n.configure({
  locales: ['en', 'fr'],
  directory: __dirname + '/locales'
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(i18n.init);
app.use(morgan('dev'));

/**
 * Init the epilogue routing
 */

epilogue.initialize({
  app: app,
  sequelize: db.sequelize
});

pass();

Controller.UserController.configureRestService(epilogue);
Controller.BookingController.configureRestService(epilogue);
Controller.ClientController.configureRestService(epilogue);
Controller.UseController.configureRestService(epilogue);
Controller.BorneController.configureRestService(epilogue);
Controller.StationController.configureRestService(epilogue);
Controller.CarController.configureRestService(epilogue);

/**
 * INIT the routing application
 */
routes(app);

/**
 * Error handling middleware
 */
app.use(i18n_middleware);

const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;
const redisSubscriber = redis.createClient('redis://h:p7t49qfsfg19efbkv4aphbq4q9a@ec2-54-235-147-98.compute-1.amazonaws.com:23889');
/**
 * Launch Server
 */
if (config.apiPort) {
  const runnable = app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://localhost:%s', config.apiPort);
  });

  io.on('connection', (socket) => {

    redisSubscriber.subscribe('car_status');

    const callback = (channel, data) => {
      console.log('EMIT in car status channel');
      socket.emit('car_status', data);
    };

    redisSubscriber.on('message', callback);

    socket.emit('news', {msg: `'Hello World!' from server`});

    socket.on('history', () => {
      for (let index = 0; index < bufferSize; index++) {
        const msgNo = (messageIndex + index) % bufferSize;
        const msg = messageBuffer[msgNo];
        if (msg) {
          socket.emit('msg', msg);
        }
      }
    });

    socket.on('msg', (data) => {
      data.id = messageIndex;
      messageBuffer[messageIndex % bufferSize] = data;
      messageIndex++;
      io.emit('msg', data);
    });
  });
  io.listen(runnable);

} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
