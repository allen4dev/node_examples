const yargs = require('yargs');
const axios = require('axios');

const WEATHER_API_KEY = 'YOUR API KEY';

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true,
    },
  })
  .help()
  .alias('help', 'h').argv;

const encodedAddress = encodeURIComponent(argv.address);

const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
axios
  .get(geocodeURL)
  .then(response => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address');
    }

    var lat = response.data.results[0].geometry.location.lat;
    var long = response.data.results[0].geometry.location.lng;
    var weatherURL = `https://api.darksky.net/forecast/${WEATHER_API_KEY}/${lat},${long}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherURL);
  })
  .then(response => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;

    console.log(
      `Its currently ${temperature}. It fells like ${apparentTemperature}`,
    );
  })
  .catch(err => {
    if (err.code === 'ENOTFOUND') {
      console.log('Unable to connect to API servers');
    } else {
      console.log(err.message);
    }
  });
