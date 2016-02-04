import db from '../models/index.js';
import wrap from '../utils/wrap';
import validator from '../utils/validator';
import HTTP_CODE from '../utils/HTTP_CODE.js';
import epilogueErrors from 'epilogue';
const VehiculeController = {
  /**
   * configure Rest Service
   * @param epilogue
   */
  configureRestService: function configure(epilogue) {
    const vehiculeResource = epilogue.resource({
      model: db.vehicule,
      endpoints: ['/cars', '/cars/:id']
    });
  }
};

export default VehiculeController;
