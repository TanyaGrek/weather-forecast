const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${decodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidGFueWFncmVrIiwiYSI6ImNqeWJjZ3c2NjA3OGozY28zcmRrZmxhN3AifQ.UydqPeVD8djY2lY0nH6wSw&limit=1`
  request({url: url, json: true}, (error, {body}) => {
    if (error) {
      callback('We have some troubles with this request!', undefined)
    } else if (body.error) {
      callback('We have some troubles with search results!', undefined)
    } else if (body.features.length === 0) {
      callback('We don\'t have any search results!', undefined)
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0]
      });
    }
  })
}

module.exports = geocode