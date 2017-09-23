const request = require('request');

function geocodeAddress(address, cb) {
  const encodedAddress = encodeURIComponent(address);

  request(
    {
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true,
    },
    (error, response, body) => {
      if (error) {
        cb('Unable to connecto to Google Servers');
      } else if (body.status === 'ZERO_RESULTS') {
        cb('Unable to find that address');
      } else if (body.status === 'OK') {
        cb(undefined, {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng,
        });
      }
    },
  );
}

module.exports = {
  geocodeAddress,
};
