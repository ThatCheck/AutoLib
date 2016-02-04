import db from '../models/index.js';
import wrap from '../utils/wrap';
import validator from '../utils/validator';
import HTTP_CODE from '../utils/HTTP_CODE.js';
import epilogueErrors from 'epilogue';
const BookingController = {
  /**
   * configure Rest Service
   * @param epilogue
   */
  configureRestService: function configure(epilogue) {
    const bookingResource = epilogue.resource({
      model: db.reservation,
      endpoints: ['/bookings', '/bookings/:idBooking']
    });
  }
};

export default BookingController;
