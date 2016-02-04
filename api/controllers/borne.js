import db from '../models/index.js';
import wrap from '../utils/wrap';
import validator from '../utils/validator';
import HTTP_CODE from '../utils/HTTP_CODE.js';
import epilogueErrors from 'epilogue';
const BorneController = {
  /**
   * configure Rest Service
   * @param epilogue
   */
  configureRestService: function configure(epilogue) {
    const borneResource = epilogue.resource({
      model: db.borne,
      endpoints: ['/bornes', '/bornes/:idBorne']
    });
  }
};

export default BorneController;
