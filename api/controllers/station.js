import db from '../models/index.js';
import wrap from '../utils/wrap';
import validator from '../utils/validator';
import HTTP_CODE from '../utils/HTTP_CODE.js';
import epilogueErrors from 'epilogue';
const StationController = {
  /**
   * configure Rest Service
   * @param epilogue
   */
  configureRestService: function configure(epilogue) {
    const StationResource = epilogue.resource({
      model: db.station,
      endpoints: ['/stations', '/stations/:id'],
      include: [
        {
          model: db.borne,
        }
      ]
    });
  }
};

export default StationController;
