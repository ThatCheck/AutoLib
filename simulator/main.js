import redis from 'redis';
import db from '../api/models/index';
import wrap from '../api/utils/wrap';
import GoogleMapsAPI from 'googlemaps';

const client = redis.createClient('redis://h:p7t49qfsfg19efbkv4aphbq4q9a@ec2-54-235-147-98.compute-1.amazonaws.com:23889');

client.on('ready', function redisConnectOK() {
  console.log('REDIS IS CONNECTED');
});

let mainLegs = [];
let currentLeg = null;
let travelInfo = null;
let terminal1 = null;
let terminal2 = null;
let currentUsedCar = null;
async function iterate() {
  if (mainLegs.length === 0) {
    console.log('END TRAVEL');
    currentUsedCar = await currentUsedCar.updateAttributes({
      Disponibilite: 'LIBRE',
      latitude: currentLeg.end_location.lat,
      longitude: currentLeg.end_location.lng
    });
    terminal2 = await terminal2.updateAttributes({
      etatBorne: 0,
      idVehicule: currentUsedCar.idVehicule
    });
    client.publish('car_status', 'end');
    return;
  }

  currentLeg = mainLegs.shift();
  currentUsedCar = await currentUsedCar.updateAttributes({
    Disponibilite: 'IN_USE',
    latitude: currentLeg.start_location.lat,
    longitude: currentLeg.start_location.lng
  });
  console.log(currentLeg);
  console.log('NEXT TIME => ' + (currentLeg.duration.value / 10) * 1000);
  client.publish('car_status', currentUsedCar.idVehicule + '|' + currentUsedCar.latitude + '|' + currentUsedCar.longitude);
  setTimeout(iterate, (currentLeg.duration.value / 10) * 1000);
}

// Search for a free station
async function runSimulator() {
  const goToTerminal = await db.borne.findAll({
    where: {
      etatBorne: 0
    },
    include: [{ model: db.station, as: 'Station'}]
  });
  if (goToTerminal.length >= 2) {
    // Generate use
    const rand1 = Math.floor(Math.random() * goToTerminal.length);
    let rand2 = Math.floor(Math.random() * goToTerminal.length);
    while (rand1 === rand2) {
      rand2 = Math.floor(Math.random() * goToTerminal.length);
    }
    /**
     * Now we need to :
     * - Set the two selected terminal to true (alias free to use)
     * - Set the car in use (set the "disponibilite" attribute to "IN_USE")
     * - Simulate the distance from Terminal 1 to Terminal 2 with Google
     * - Push the value of the localisation every 10 seconds (modify the latitude and longitude) with the Google maps API
     * - Add a entry in the table "utilise"
     */
    terminal1 = goToTerminal[rand1];
    terminal2 = goToTerminal[rand2];
    terminal1 = await terminal1.updateAttributes({
      etatBorne: 1
    });
    terminal2 = await terminal2.updateAttributes({
      etatBorne: 1
    });

    currentUsedCar = await db.vehicule.findById(terminal1.idVehicule);

    const publicConfig = {
      key: 'AIzaSyAeXiDryv9t02AmY04I8Pogahvf0rqF4Z8',
    };

    const googleMapAPI = new GoogleMapsAPI(publicConfig);
    const params = {
      'origin': terminal1.Station.latitude + ',' + terminal1.Station.longitude,
      'destination': terminal2.Station.latitude + ',' + terminal2.Station.longitude,
      'language': 'fr',
      mode: 'driving',
      'traffic_model': 'best_guess',
      departure_time: new Date((new Date()).getTime() + 3600000),
    };
    googleMapAPI.directions(params, function(err, result) {
      if (err) console.error(err);
      const legs = result.routes[0].legs[0];
      mainLegs = legs.steps;
      travelInfo = result;
      iterate();
    });
  }else {
    console.error('Unable to find 2 free terminal');
  }
}

try {
  runSimulator();
}catch (err) {
  console.error(err);
}
