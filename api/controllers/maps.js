import db from '../models/index.js';
import wrap from '../utils/wrap';
import validator from '../utils/validator';
import HTTP_CODE from '../utils/HTTP_CODE.js';
import GoogleMapsAPI from 'googlemaps';
import geolib from 'geolib';

const MapsController = {
  calculateMinPath: wrap(async function(req, res) {
    const publicConfig = {
      key: 'AIzaSyAeXiDryv9t02AmY04I8Pogahvf0rqF4Z8',
    };
    const googleMapAPI = new GoogleMapsAPI(publicConfig);

    const allTerminal = await db.borne.findAll({
      where: {
        etatBorne: 0
      },
      include: [{ model: db.station, as: 'Station'}]
    });

    let mostNearestFrom = Number.MAX_VALUE;
    let selectedNearestCarFrom = null;

    for (let index = 0; index < allTerminal.length; index++) {
      const distance = geolib.getDistance(
        {latitude: allTerminal[index].Station.latitude, longitude: allTerminal[index].Station.longitude},
        {latitude: req.query.latitude_from, longitude: req.query.longitude_from}
      );
      if (distance <= mostNearestFrom) {
        mostNearestFrom = distance;
        selectedNearestCarFrom = allTerminal[index];
      }
    }

    let mostNearestTo = Number.MAX_VALUE;
    let selectedNearestCarTo = null;

    for (let index = 0; index < allTerminal.length; index++) {
      const distance = geolib.getDistance(
        {latitude: allTerminal[index].Station.latitude, longitude: allTerminal[index].Station.longitude},
        {latitude: req.query.latitude_to, longitude: req.query.longitude_to}
      );
      if (distance <= mostNearestTo) {
        mostNearestTo = distance;
        selectedNearestCarTo = allTerminal[index];
      }
    }
    res.status(200).json({from: selectedNearestCarFrom, to: selectedNearestCarTo});
    /**
     * SORRY FOR THE CODE : RUSH-TIME !! CALLBACK HELL
    googleMapAPI.directions({
      'origin': req.query.latitude_from + ',' + req.query.longitude_from,
      'destination': selectedNearestCarFrom.Station.latitude + ',' + selectedNearestCarFrom.Station.longitude,
      'language': 'fr',
      mode: 'walking',
    }, function(err, result) {
      if (err) console.error(err);
      const legs = result.routes[0].legs[0];
      dataReturn.push(legs.steps);
      // Now in cars
      googleMapAPI.directions({
        'origin': selectedNearestCarFrom.Station.latitude + ',' + selectedNearestCarFrom.Station.longitude,
        'destination': selectedNearestCarTo.Station.latitude + ',' + selectedNearestCarTo.Station.longitude,
        'language': 'fr',
        mode: 'driving',
      }, function(err1, result1) {
        if (err) console.error(err1);
        const legs1 = result1.routes[0].legs[0];
        dataReturn.push(legs1.steps);
        googleMapAPI.directions({
          'origin': selectedNearestCarTo.Station.latitude + ',' + selectedNearestCarTo.Station.longitude,
          'destination': req.query.latitude_to + ',' + req.query.longitude_to,
          'language': 'fr',
          mode: 'walking',
        }, function(err2, result2) {
          if (err) console.error(err1);
          const legs2 = result2.routes[0].legs[0];
          dataReturn.push(legs2.steps);
          res.status(200).json(dataReturn);
        });
      });
    });
   */

  })
};

export default MapsController;
