const request = require('request');

function getWeather(lat, long, cb) {
  const url = `https://api.darksky.net/forecast/82002a25bd9c0be9819eaa487e895870/${lat},${long}`;

  request(
    {
      url,
      json: true,
    },
    (err, response, body) => {
      if (!err && response.statusCode === 200) {
        cb(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature,
        });
      } else {
        cb('Unable to fetch weather');
      }
    },
  );
}

module.exports = { getWeather };
