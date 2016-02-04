import db from '../models/index.js';
import wrap from '../utils/wrap';
import validator from '../utils/validator';
import HTTP_CODE from '../utils/HTTP_CODE.js';
import epilogueErrors from 'epilogue';
const ClientController = {
  /**
   * configure Rest Service
   * @param epilogue
   */
  configureRestService: function configure(epilogue) {
    const clientResource = epilogue.resource({
      model: db.client,
      endpoints: ['/clients', '/clients/:idClient'],
      include: [
        {
          model: db.utilise,
        },
        {
          model: db.reservation,
        },
      ]
    });
  }
};

export default ClientController;
