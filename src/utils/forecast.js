const request = require('request');

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/4d47546f3a444694ef2a9bb3986f72eb/${lat},${long}?units=si&lang=ru`
  request({url, json: true}, (error, {body}) => {

    if (error) {
      callback('We have some troubles with this request!', undefined)
    } else if (body.error) {
      callback('We have some troubles with search results!', undefined)
    } else {
      callback(undefined, body.daily.summary);
    }
  })
}

module.exports = forecast