const yargs = require('yargs');

const geocode = require('./geocode');
const weather = require('./weather');

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

geocode.geocodeAddress(argv.address, (error, results) => {
  if (error) {
    console.log(error);
  } else {
    console.log(results.address);
    weather.getWeather(results.latitude, results.longitude, function(
      err,
      weatherResults,
    ) {
      if (err) {
        console.log(err);
      } else {
        console.log(
          `Its currently ${weatherResults.temperature}. It fells like ${weatherResults.apparentTemperature}`,
        );
      }
    });
  }
});
