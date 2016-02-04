import db from '../models/index.js';
import wrap from '../utils/wrap';
import validator from '../utils/validator';
import HTTP_CODE from '../utils/HTTP_CODE.js';
import GoogleMapsAPI from 'googlemaps';

const MapsController = {
  calculateMinPath: function(req, res) {
    const publicConfig = {
      key: 'AIzaSyAeXiDryv9t02AmY04I8Pogahvf0rqF4Z8',
    };
    const googleMapAPI = new GoogleMapsAPI(publicConfig);
    res.status(404).json({});
  }
};

export default MapsController;
